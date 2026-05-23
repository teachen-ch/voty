.PHONY: dev dev-pb dev-fe build build-fe build-pb docker-up docker-down docker-logs setup setup-pb setup-fe pb-admin clean

dev:
	@trap 'kill 0' INT; \
	(cd pb && go run . serve --dev) & \
	(cd frontend && npm run dev) & \
	wait

dev-pb:
	cd pb && go run . serve --dev

dev-fe:
	cd frontend && npm run dev

build-fe:
	cd frontend && npm run build

build-pb:
	cd pb && go build -o civictools .

build: build-fe build-pb

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f pocketbase

setup-pb:
	cd pb && go mod download

setup-fe:
	cd frontend && npm install

setup: setup-pb setup-fe

pb-admin:
	cd pb && ./civictools superuser create "$(EMAIL)" "$(PASS)"

clean:
	rm -f pb/civictools
	rm -rf frontend/dist
	rm -rf frontend/node_modules
