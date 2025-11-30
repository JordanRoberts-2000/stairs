use {
    staircraft::utils::fetch_html,
    std::{fs::File, io::Write, path::PathBuf},
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let url = "https://docs.google.com/forms/d/e/1FAIpQLSdFMoOW1HPcREeLG-lpMLebxwzBDzp9S18gID8cEDtrWAvxFg/viewform";
    let html = fetch_html(url).await?;

    let out_path: PathBuf = ["tests", "data", "snapshot.txt"].iter().collect();
    let mut file = File::create(&out_path)?;
    file.write_all(html.as_bytes())?;

    println!("Saved snapshot to {}", out_path.display());
    Ok(())
}
