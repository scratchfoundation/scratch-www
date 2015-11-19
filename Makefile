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
	@make version

clean:
	rm -rf ./build
	mkdir -p build
	mkdir -p locales


deploy:
ifeq ($(shell grep "artifact: deploy.zip" .elasticbeanstalk/config.yml 2> /dev/null), )
	@echo "You must configure elasticbeanstalk to deploy an artifact."
	@echo "Add the following to your .elasticbeanstalk/config.yml"
	@echo "deploy:\n  artifact: deploy.zip"
else
	@make build
	git archive -o deploy.zip HEAD
	zip -rv deploy.zip build
	eb deploy -l $(GIT_VERSION) -m "$(GIT_MESSAGE)"
endif

translations:
	./lib/bin/build-locales locales/translations.json

version:
	echo $(GIT_VERSION) > ./build/version.txt

webpack:
	$(WEBPACK) --bail

# ------------------------------------

start:
	$(NODE) ./server/index.js

# ------------------------------------

test:
	@make lint
	@make build
	@echo ""
	@make unit
	@echo ""
	@make functional
	@echo ""

lint:
	$(ESLINT) ./*.js
	$(ESLINT) ./server/*.js
	$(ESLINT) ./src/*.js
	$(ESLINT) ./src/*.jsx
	$(ESLINT) ./src/mixins/*.jsx
	$(ESLINT) ./src/views/**/*.jsx
	$(ESLINT) ./src/components/**/*.jsx
	$(SASSLINT) ./src/*.scss
	$(SASSLINT) ./src/views/**/*.scss
	$(SASSLINT) ./src/components/**/*.scss

unit:
	$(TAP) ./test/unit/*.js

functional:
	$(TAP) ./test/functional/*.js

integration:
	$(TAP) ./test/integration/*.js

# ------------------------------------

.PHONY: build clean deploy static translations version webpack watch stop start test lint
