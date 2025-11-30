use anyhow::{Context, Result};

pub async fn fetch_html(url: &str) -> Result<String> {
    reqwest::get(url)
        .await
        .context("Failed to send HTTP request")?
        .text()
        .await
        .context("Failed to read response body as text")
}
