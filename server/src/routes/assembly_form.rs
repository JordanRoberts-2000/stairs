use {
    crate::models::AssemblySubmission,
    axum::{Json, http::StatusCode, response::IntoResponse},
};

pub async fn assembly_form(Json(submission): Json<AssemblySubmission>) -> impl IntoResponse {
    println!("Received assembly submission: {submission:#?}");
    StatusCode::NO_CONTENT
}
