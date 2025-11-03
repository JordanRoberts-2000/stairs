use {
    super::utils::{parse_env, parse_env_size},
    std::net::SocketAddr,
};

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
        Self {
            port: parse_env("PORT", 3030),
            max_concurrent_requests: parse_env("MAX_CONCURRENT_REQUESTS", 100),
            request_timeout_secs: parse_env("REQUEST_TIMEOUT_SECS", 30),
            rate_per_second: parse_env("RATE_PER_SECOND", 30),
            rate_burst_size: parse_env("RATE_BURST_SIZE", 40),
            max_body_size: parse_env_size("MAX_BODY_SIZE_MB", 1),
        }
    }

    pub fn server_addr(&self) -> SocketAddr {
        SocketAddr::from(([0, 0, 0, 0], self.port))
    }
}
