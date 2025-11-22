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

#[cfg(test)]
mod tests {
    use {
        super::*,
        axum::{
            Router,
            body::Body,
            http::{Request, StatusCode},
            routing::post,
        },
        tokio::time::sleep,
        tower::ServiceExt,
    };

    async fn echo(body: String) -> String {
        body
    }

    #[tokio::test]
    async fn request_larger_than_max_body_is_rejected() {
        let cfg = AppConfig { max_body_size: 10, ..Default::default() };

        let app = Router::new().route("/echo", post(echo)).layer(layer(&cfg));

        let big_body = "this is more than 10 bytes";

        let req =
            Request::builder().uri("/echo").method("POST").body(Body::from(big_body)).unwrap();

        let res = app.oneshot(req).await.unwrap();

        assert_eq!(res.status(), StatusCode::PAYLOAD_TOO_LARGE);
    }

    async fn slow_handler() -> &'static str {
        sleep(Duration::from_millis(200)).await;
        "done"
    }

    #[tokio::test]
    async fn request_exceeding_timeout_fails() {
        let cfg = AppConfig {
            request_timeout_secs: 0, // effectively immediate timeout
            ..Default::default()
        };

        let app = Router::new().route("/slow", post(slow_handler)).layer(layer(&cfg));

        let req = Request::builder().uri("/slow").method("POST").body(Body::empty()).unwrap();

        let res = app.oneshot(req).await.unwrap();
        assert_eq!(res.status(), StatusCode::REQUEST_TIMEOUT);
    }
}
