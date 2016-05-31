ESLINT=./node_modules/.bin/eslint
NODE=node
SASSLINT=./node_modules/.bin/sass-lint -v
S3CMD=s3cmd
TAP=./node_modules/.bin/tap
WATCH=./node_modules/.bin/watch
WEBPACK=./node_modules/.bin/webpack

# ------------------------------------

build:
	@make clean
	@make translations
	@make webpack

clean:
	rm -rf ./build
	rm -rf ./intl
	mkdir -p build
	mkdir -p intl


deploy:
	@make build
	@make sync

translations:
	./bin/build-locales intl

webpack:
	$(WEBPACK) --bail

sync-s3:
	$(S3CMD) sync -P --delete-removed --exclude '.DS_Store' --exclude '*.svg' ./build/ s3://$(S3_BUCKET_NAME)/
	$(S3CMD) sync -P --delete-removed --exclude '*' --include '*.svg' --mime-type 'image/svg+xml' ./build/ s3://$(S3_BUCKET_NAME)/

sync-fastly:
	$(NODE) ./bin/configure-fastly.js

sync:
	@make sync-s3
	@make sync-fastly

# ------------------------------------

start:
	$(NODE) ./dev-server/index.js

# ------------------------------------

test:
	@make lint
	@make build
	@echo ""
	@make unit
	@echo ""
	@make functional
	@echo ""
	@make localization
	@echo ""

lint:
	$(ESLINT) . --ext .js,.jsx,.json
	$(SASSLINT) ./src/*.scss
	$(SASSLINT) ./src/**/*.scss

unit:
	$(TAP) ./test/unit/*.js

functional:
	$(TAP) ./test/functional/*.js

integration:
	$(TAP) ./test/integration/*.js

localization:
	$(TAP) ./test/localization/*.js

# ------------------------------------

.PHONY: build clean deploy translations webpack stop start test lint unit functional integration localization
