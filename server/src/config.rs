use {super::utils::parse_env, std::net::SocketAddr};

pub struct AppConfig {
    pub port: u16,
    pub max_concurrent_requests: usize,
    pub request_timeout_secs: u64,
    pub rate_per_second: u64,
    pub rate_burst_size: u32,
    pub max_body_size: usize,
}

impl AppConfig {
    pub fn load_from_env() -> Self {
        let port = parse_env("PORT", Self::default().port);
        Self { port, ..Default::default() }
    }

    pub fn server_addr(&self) -> SocketAddr {
        SocketAddr::from(([0, 0, 0, 0], self.port))
    }
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            port: 3020,
            max_concurrent_requests: 100,
            request_timeout_secs: 30,
            rate_per_second: 30,
            rate_burst_size: 40,
            max_body_size: 1 * 1024 * 1024,
        }
    }
}

#[cfg(test)]
mod tests {
    use {super::*, serial_test::serial, std::env};

    #[test]
    #[serial]
    fn load_from_env_uses_default_when_port_not_set() {
        unsafe {
            env::remove_var("PORT");
        }
        let cfg = AppConfig::load_from_env();
        assert_eq!(cfg.port, AppConfig::default().port);
    }

    #[test]
    #[serial]
    fn load_from_env_overrides_port_from_env() {
        unsafe {
            env::remove_var("PORT");
            env::set_var("PORT", "8080");
        }
        let cfg = AppConfig::load_from_env();
        assert_eq!(cfg.port, 8080);
        unsafe {
            env::remove_var("PORT");
        }
    }
}
