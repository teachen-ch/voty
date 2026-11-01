.PHONY: dev dev-pb dev-fe dev-e2e build build-fe build-pb docker-up docker-down docker-logs setup setup-pb setup-fe pb-admin clean

dev:
	@trap 'kill 0' INT; \
	(cd pb && go run . serve --dev) & \
	(cd frontend && npm run dev -- --host) & \
	wait

dev-pb:
	cd pb && go run . serve --dev

dev-fe:
	cd frontend && npm run dev

dev-e2e:
	rm -rf pb/pb_data_e2e
	cd pb && go run . superuser upsert e2e-admin@civictools.local e2e-admin-password --dir=pb_data_e2e
	@trap 'kill 0' INT TERM EXIT; \
	(cd pb && go run . serve --dev --http=127.0.0.1:8090 --dir=pb_data_e2e) & \
	(cd frontend && npm run dev -- --host 127.0.0.1) & \
	wait

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
