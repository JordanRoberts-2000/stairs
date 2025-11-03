use {
    std::{env, fmt::Display, str::FromStr},
    tracing::{debug, warn},
};

pub fn parse_env_size(key: &str, default_mb: usize) -> usize {
    let mb: usize = parse_env(key, default_mb);
    let bytes = mb * 1024 * 1024;
    debug!(
        key = %key,
        mb = mb,
        bytes = bytes,
        "Parsed size configuration"
    );
    bytes
}

pub fn parse_env<T>(key: &str, default: T) -> T
where
    T: FromStr + Copy + Display,
    T::Err: Display,
{
    match env::var(key) {
        Ok(raw) => {
            let trimmed = raw.trim();
            if trimmed.is_empty() {
                warn!(
                    key = %key,
                    default = %default,
                    "Environment variable is set but empty, using default"
                );
                default
            } else {
                match trimmed.parse::<T>() {
                    Ok(value) => {
                        debug!(key = %key, value = %value, "Loaded from environment");
                        value
                    }
                    Err(e) => {
                        warn!(
                            key = %key,
                            raw_value = %trimmed,
                            default = %default,
                            error = %e,
                            "Failed to parse environment variable, using default"
                        );
                        default
                    }
                }
            }
        }
        Err(_) => {
            debug!(key = %key, default = %default, "Environment variable not set, using default");
            default
        }
    }
}
