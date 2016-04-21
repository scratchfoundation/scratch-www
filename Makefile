ESLINT=./node_modules/.bin/eslint
NODE=node
SASSLINT=./node_modules/.bin/sass-lint -v
TAP=./node_modules/.bin/tap
WATCH=./node_modules/.bin/watch
WEBPACK=./node_modules/.bin/webpack
GIT_VERSION=$(shell git rev-parse --verify --short=5 HEAD 2> /dev/null)
GIT_VERSION?=$(WWW_VERSION)
GIT_MESSAGE=$(shell git log -1 --pretty=%s 2> /dev/null)

# ------------------------------------

build:
	@make clean
	@make translations
	@make webpack
	@make tag

clean:
	rm -rf ./build
	rm -rf ./intl
	mkdir -p build
	mkdir -p intl


deploy:
	@make build
	@make sync

tag:
	echo $(GIT_VERSION) > ./build/version.txt

translations:
	./bin/build-locales intl

webpack:
	$(WEBPACK) --bail

sync-s3:
	$(NODE) ./bin/deploy-to-s3.js

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
	$(ESLINT) ./*.js
	$(ESLINT) ./dev-server/*.js
	$(ESLINT) ./bin/**/*.js
	$(ESLINT) ./src/*.js
	$(ESLINT) ./src/mixins/*.jsx
	$(ESLINT) ./src/views/**/*.jsx
	$(ESLINT) ./src/components/**/**/*.jsx
	$(SASSLINT) ./src/*.scss
	$(SASSLINT) ./src/views/**/*.scss
	$(SASSLINT) ./src/components/**/**/*.scss

unit:
	$(TAP) ./test/unit/*.js

functional:
	$(TAP) ./test/functional/*.js

integration:
	$(TAP) ./test/integration/*.js

localization:
	$(TAP) ./test/localization/*.js

# ------------------------------------

.PHONY: build clean deploy static tag translations webpack watch stop start test lint
