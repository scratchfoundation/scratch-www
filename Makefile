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

tag:
	echo $(GIT_VERSION) > ./build/version.txt

translations:
	./bin/build-locales intl

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
	@make localization
	@echo ""

lint:
	$(ESLINT) ./*.js
	$(ESLINT) ./server/*.js
	$(ESLINT) ./src/*.js
	$(ESLINT) ./src/mixins/*.jsx
	$(ESLINT) ./src/views/**/*.jsx
	$(ESLINT) ./src/components/**/*.jsx
	$(SASSLINT) ./src/*.scss
	$(SASSLINT) ./src/views/**/*.scss
	$(SASSLINT) ./src/components/**/*.scss

localization-standalone:
	@make translations
	@make localization
	@echo ""

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
