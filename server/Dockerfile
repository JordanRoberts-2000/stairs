FROM rust:1.88-bookworm AS build

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

COPY . .

RUN cargo build --release

FROM debian:bookworm-slim

COPY --from=build /app/target/release/server /bin/
COPY --from=build /app/dist ./dist

EXPOSE 3020
ENV RUST_LOG=debug
CMD ["/bin/server"]

