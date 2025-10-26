use {anyhow::Result, tracing::level_filters::LevelFilter};

pub fn init() -> Result<()> {
    tracing_subscriber::fmt()
        .with_target(false)
        .with_max_level(LevelFilter::DEBUG)
        .try_init()
        .map_err(|e| anyhow::anyhow!("Failed to initialize logger: {}", e))
}
