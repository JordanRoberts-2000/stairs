use {
    std::{env, fmt::Display, str::FromStr},
    tracing::{debug, warn},
};

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

#[cfg(test)]
mod tests {
    use {super::*, serial_test::serial, std::env};

    const KEY: &str = "TEST_PARSE_ENV";

    fn clear() {
        unsafe {
            env::remove_var(KEY);
        }
    }

    #[test]
    #[serial]
    fn returns_default_when_not_set() {
        clear();
        let value = parse_env(KEY, 42u16);
        assert_eq!(value, 42);
    }

    #[test]
    #[serial]
    fn parses_valid_value() {
        clear();
        unsafe {
            env::set_var(KEY, "8080");
        }
        let value = parse_env(KEY, 42u16);
        assert_eq!(value, 8080);
        clear();
    }

    #[test]
    #[serial]
    fn empty_string_uses_default() {
        clear();
        unsafe {
            env::set_var(KEY, " ");
        }
        let value = parse_env(KEY, 42u16);
        assert_eq!(value, 42);
        clear();
    }

    #[test]
    #[serial]
    fn invalid_value_uses_default() {
        clear();
        unsafe {
            env::set_var(KEY, "not-a-number");
        }
        let value = parse_env(KEY, 42u16);
        assert_eq!(value, 42);
        clear();
    }
}
