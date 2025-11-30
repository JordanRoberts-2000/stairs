use {
    crate::{config::AppConfig, context::AppContext},
    anyhow::Result,
    dotenvy::dotenv,
    tokio::net::TcpListener,
    tracing::info,
};

pub mod config;
pub mod context;
pub mod logging;
pub mod middleware;
pub mod models;
pub mod router;
pub mod routes;
pub mod utils;

pub async fn run() -> Result<()> {
    dotenv().ok();
    logging::init()?;

    let ctx = AppContext::new(AppConfig::load_from_env())?;
    let addr = ctx.config.server_addr();

    let app = router::build(ctx)?;

    let listener = TcpListener::bind(&addr).await?;
    info!("Server listening on {}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}
