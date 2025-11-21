use {
    crate::config::AppConfig,
    anyhow::{Context, Result},
    axum::body::Body,
    governor::{clock::QuantaInstant, middleware::NoOpMiddleware},
    tower_governor::{
        GovernorLayer, governor::GovernorConfigBuilder, key_extractor::PeerIpKeyExtractor,
    },
};

type RateLimitMiddleware = NoOpMiddleware<QuantaInstant>;
type RateLimitLayer = GovernorLayer<PeerIpKeyExtractor, RateLimitMiddleware, Body>;

pub fn layer(cfg: &AppConfig) -> Result<RateLimitLayer> {
    let rate_limit_cfg = GovernorConfigBuilder::default()
        .per_second(cfg.rate_per_second)
        .burst_size(cfg.rate_burst_size)
        .finish()
        .context("failed to build per-IP rate limiter config")?;

    Ok(GovernorLayer::new(rate_limit_cfg))
}
