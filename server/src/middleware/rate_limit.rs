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

#[cfg(test)]
mod tests {
    use {
        super::*,
        axum::{
            Router,
            body::Body,
            http::{Request, StatusCode},
            routing::get,
        },
        std::net::SocketAddr,
        tower::{Service, ServiceExt},
    };

    async fn ok_handler() -> &'static str {
        "ok"
    }

    #[test]
    fn builds_rate_limit_layer_for_valid_config() {
        let cfg = AppConfig { rate_per_second: 10, rate_burst_size: 20, ..Default::default() };
        let result = layer(&cfg);
        assert!(result.is_ok(), "layer() should succeed for sane config");
    }

    #[tokio::test]
    async fn first_request_ok_second_request_rate_limited() {
        let cfg = AppConfig { rate_per_second: 1, rate_burst_size: 1, ..Default::default() };
        let rate_layer = layer(&cfg).expect("rate-limit layer should build");

        let app = Router::new().route("/test", get(ok_handler)).layer(rate_layer);

        // tower-governor with PeerIpKeyExtractor needs connect_info (peer IP)
        let mut make_svc = app.into_make_service_with_connect_info::<SocketAddr>();
        let addr: SocketAddr = "127.0.0.1:12345".parse().unwrap();
        let mut svc = make_svc.call(addr).await.unwrap();

        // First request should be allowed
        let req1 = Request::builder().uri("/test").body(Body::empty()).unwrap();
        let res1 = ServiceExt::<Request<Body>>::oneshot(&mut svc, req1).await.unwrap();
        assert_eq!(res1.status(), StatusCode::OK);

        // Immediate second request should hit the rate limit
        let req2 = Request::builder().uri("/test").body(Body::empty()).unwrap();
        let res2 = ServiceExt::<Request<Body>>::oneshot(&mut svc, req2).await.unwrap();

        assert_eq!(res2.status(), StatusCode::TOO_MANY_REQUESTS);
    }
}
