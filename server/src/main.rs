pub mod config;
pub mod logging;
pub mod middleware;
pub mod routes;
pub mod utils;

use {
    crate::config::AppConfig,
    anyhow::Result,
    axum::{Router, routing::get},
    dotenvy::dotenv,
    tokio::net::TcpListener,
    tower_http::services::ServeDir,
    tracing::info,
};

fn create_app(cfg: &AppConfig) -> Result<Router> {
    Ok(Router::new()
        .route("/health", get(routes::health_check))
        .fallback_service(ServeDir::new("public"))
        .layer(middleware::protection::layer(&cfg))
        .layer(middleware::rate_limit::layer(&cfg)?)
        .layer(middleware::logging::layer()))
}

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    logging::init()?;

    let cfg = AppConfig::load_from_env();
    let app = create_app(&cfg)?;

    let addr = cfg.server_addr();
    let listener = TcpListener::bind(addr).await?;
    info!("Server listening on {}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use {
        super::*,
        axum::{
            body::Body,
            http::{Request, StatusCode},
        },
        tower::ServiceExt,
    };

    #[tokio::test]
    async fn test_health_check() {
        let cfg = AppConfig::load_from_env();
        let app = create_app(&cfg).unwrap();

        let request = Request::builder().uri("/health").body(Body::empty()).unwrap();

        let response = app.oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn test_root_path_serves_static_files() {
        let cfg = AppConfig::load_from_env();
        let app = create_app(&cfg).unwrap();
        let request = Request::builder().uri("/").body(Body::empty()).unwrap();

        let response = app.oneshot(request).await.unwrap();
        assert!(response.status() == StatusCode::OK);
    }
}
