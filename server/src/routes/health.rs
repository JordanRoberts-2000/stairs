use {
    axum::{Json, response::IntoResponse},
    serde_json::json,
};

pub async fn health_check() -> impl IntoResponse {
    Json(json!({
      "status": "ok",
    }))
}

#[cfg(test)]
mod tests {
    use {super::*, axum::http::StatusCode};

    #[tokio::test]
    async fn test_health_check_returns_ok() {
        let response = health_check().await.into_response();
        assert_eq!(response.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn test_health_check_json_body() {
        use axum::body::to_bytes;

        let response = health_check().await.into_response();
        let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let json: serde_json::Value = serde_json::from_slice(&body).unwrap();

        assert_eq!(json["status"], "ok");
    }
}
