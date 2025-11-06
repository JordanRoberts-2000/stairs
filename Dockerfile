FROM node:22 AS client
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM rust:1.88 AS server
WORKDIR /app
COPY server/Cargo.toml server/Cargo.lock ./
COPY server/src ./src
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=server /app/target/release/server /usr/local/bin/server
COPY --from=client /app/dist ./public
EXPOSE 3020
CMD ["server"]


