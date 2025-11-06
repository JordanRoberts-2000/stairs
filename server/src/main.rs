pub mod config;
pub mod logging;
pub mod utils;

use {
    crate::config::AppConfig,
    anyhow::{Context, Result},
    axum::{Json, Router, response::IntoResponse, routing::get},
    dotenvy::dotenv,
    serde_json::json,
    std::time::Duration,
    tokio::net::TcpListener,
    tower::{ServiceBuilder, limit::ConcurrencyLimitLayer},
    tower_governor::{
        GovernorLayer, governor::GovernorConfigBuilder, key_extractor::GlobalKeyExtractor,
    },
    tower_http::{
        limit::RequestBodyLimitLayer, services::ServeDir, timeout::TimeoutLayer, trace::TraceLayer,
    },
    tracing::info,
};

async fn health_check() -> impl IntoResponse {
    Json(json!({
      "status": "ok",
    }))
}

fn create_app(cfg: &AppConfig) -> Result<Router> {
    let rate_limit_cfg = GovernorConfigBuilder::default()
        .per_second(cfg.rate_per_second)
        .key_extractor(GlobalKeyExtractor)
        .burst_size(cfg.rate_burst_size)
        .finish()
        .context("failed to build per-IP governor config")?;

    let protection_middleware = ServiceBuilder::new()
        .layer(RequestBodyLimitLayer::new(cfg.max_body_size))
        .layer(TimeoutLayer::new(Duration::from_secs(cfg.request_timeout_secs)))
        .layer(ConcurrencyLimitLayer::new(cfg.max_concurrent_requests))
        .layer(GovernorLayer::new(rate_limit_cfg));

    Ok(Router::new()
        .route("/health", get(health_check))
        .fallback_service(ServeDir::new("public"))
        .layer(protection_middleware)
        .layer(TraceLayer::new_for_http()))
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
