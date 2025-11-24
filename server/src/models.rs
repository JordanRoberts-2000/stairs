use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
enum StairDesign {
    Straight,
    Winder,
    DoubleWinder,
}

#[derive(Debug, Deserialize)]
pub struct AssemblySubmission {
    wos: u16,
    operator: String,
    bench: u8,
    customer: String,
    site: String,
    plot: String,
    design: StairDesign,
    treads: u8,
}
