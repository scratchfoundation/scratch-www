ESLINT=./node_modules/.bin/eslint
NODE= NODE_OPTIONS=--max_old_space_size=8000 node
SCRATCH_DOCKER_CONFIG=./node_modules/.bin/docker_config.sh
S3CMD=s3cmd sync -P --delete-removed --add-header=Cache-Control:no-cache,public,max-age=3600
TAP=./node_modules/.bin/tap
WEBPACK= NODE_OPTIONS=--max_old_space_size=8000 ./node_modules/.bin/webpack

# ------------------------------------

$(SCRATCH_DOCKER_CONFIG):
	npm install scratch-docker

docker-up: $(SCRATCH_DOCKER_CONFIG)
	$(SCRATCH_DOCKER_CONFIG) network create
	docker-compose up

docker-down:
	docker-compose down

# ------------------------------------

deploy:
	@make build
	@make sync

sync-s3:
	$(S3CMD) --exclude '.DS_Store' --exclude '*.svg' --exclude '*.js' ./build/ s3://$(S3_BUCKET_NAME)/
	$(S3CMD) --exclude '*' --include '*.svg' --mime-type 'image/svg+xml' ./build/ s3://$(S3_BUCKET_NAME)/
	$(S3CMD) --exclude '*' --include '*.js' --mime-type 'application/javascript' ./build/ s3://$(S3_BUCKET_NAME)/

sync-fastly:
	$(NODE) ./bin/configure-fastly.js

sync:
	@make sync-s3
	@make sync-fastly

# ------------------------------------

.PHONY: deploy docker-up docker-down sync sync-fastly sync-s3
