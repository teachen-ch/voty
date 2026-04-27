FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o civictools .

FROM alpine:3.19
WORKDIR /pb
COPY --from=builder /build/civictools .
EXPOSE 8090
ENTRYPOINT ["./civictools"]
CMD ["serve", "--http=0.0.0.0:8090"]
