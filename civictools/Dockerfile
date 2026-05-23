# Build frontend (Preact + Vite → static dist/)
FROM node:24-alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build Go binary (embeds PocketBase + migrations)
FROM golang:1.22-alpine AS backend
WORKDIR /build
COPY pb/go.mod pb/go.sum ./
RUN go mod download
COPY pb/ ./
RUN CGO_ENABLED=0 go build -o civictools .

# Final image: binary + baked-in frontend dist
# Layout matches pb/main.go: WORKDIR /app/pb, static files at ../frontend/dist
FROM alpine:3.19
WORKDIR /app/pb
COPY --from=backend  /build/civictools         /app/pb/civictools
COPY --from=frontend /frontend/dist            /app/frontend/dist
EXPOSE 8090
ENTRYPOINT ["./civictools"]
CMD ["serve", "--http=0.0.0.0:8090"]
