use {
    crate::{context::AppContext, middleware, routes},
    anyhow::Result,
    axum::{
        Router,
        routing::{get, post},
    },
    tower_http::services::ServeDir,
};

pub fn build(ctx: AppContext) -> Result<Router> {
    Ok(Router::new()
        .layer(middleware::protection::layer(&ctx.config))
        .layer(middleware::rate_limit::layer(&ctx.config)?)
        .layer(middleware::logging::layer())
        .nest(
            "/api",
            Router::new()
                .route("/health", get(routes::health_check))
                .route("/assembly/form", post(routes::assembly_form)),
        )
        .with_state(ctx)
        .fallback_service(ServeDir::new("public")))
}
