use {crate::config::AppConfig, anyhow::Result};

#[derive(Debug, Clone)]
pub struct GoogleFormIds {
    date: String,
    assembler: String,
    bench: String,
    customer: String,
    site: String,
    plot: String,
    design: String,
    treads: String,
    wos: String,
}

#[derive(Debug, Clone)]
pub struct AppContext {
    pub config: AppConfig,
    pub operators: Vec<String>,
    pub form_ids: GoogleFormIds,
}

impl AppContext {
    pub fn new(config: AppConfig) -> Result<Self> {
        let operators = vec!["jordan robers".to_string(), "sadman".to_string()];
        let form_ids = GoogleFormIds {
            assembler: String::new(),
            bench: String::new(),
            customer: String::new(),
            date: String::new(),
            design: String::new(),
            site: String::new(),
            plot: String::new(),
            treads: String::new(),
            wos: String::new(),
        };
        Ok(Self { config, operators, form_ids })
    }
}
