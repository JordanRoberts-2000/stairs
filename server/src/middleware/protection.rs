use {
    crate::config::AppConfig,
    std::time::Duration,
    tower::{
        ServiceBuilder,
        layer::util::{Identity, Stack},
        limit::ConcurrencyLimitLayer,
    },
    tower_http::{limit::RequestBodyLimitLayer, timeout::TimeoutLayer},
};

type ProtectionLayer = ServiceBuilder<
    Stack<ConcurrencyLimitLayer, Stack<TimeoutLayer, Stack<RequestBodyLimitLayer, Identity>>>,
>;

pub fn layer(cfg: &AppConfig) -> ProtectionLayer {
    ServiceBuilder::new()
        .layer(RequestBodyLimitLayer::new(cfg.max_body_size))
        .layer(TimeoutLayer::new(Duration::from_secs(cfg.request_timeout_secs)))
        .layer(ConcurrencyLimitLayer::new(cfg.max_concurrent_requests))
}
