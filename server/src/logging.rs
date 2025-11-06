use {
    anyhow::Result,
    time::{UtcOffset, macros::format_description},
    tracing::level_filters::LevelFilter,
    tracing_subscriber::fmt::time::OffsetTime,
};

pub fn init() -> Result<()> {
    let offset = UtcOffset::current_local_offset().unwrap_or(UtcOffset::UTC);

    let fmt = format_description!("[day]-[month]-[year]%[hour]:[minute]");
    let timer = OffsetTime::new(offset, fmt);

    tracing_subscriber::fmt()
        .with_timer(timer)
        .with_target(false)
        .with_max_level(LevelFilter::DEBUG)
        .try_init()
        .map_err(|e| anyhow::anyhow!("Failed to initialize logger: {}", e))
}
