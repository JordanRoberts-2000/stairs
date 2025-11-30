use {anyhow::Result, staircraft};

#[tokio::main]
async fn main() -> Result<()> {
    staircraft::run().await
}
