ESLINT=./node_modules/.bin/eslint
NODE=node
SASSLINT=./node_modules/.bin/sass-lint -v
WATCH=./node_modules/.bin/watch
WEBPACK=./node_modules/.bin/webpack

# ------------------------------------

build:
	@make clean
	@make translations
	@make webpack

clean:
	rm -rf ./build
	mkdir -p build
	mkdir -p locales


deploy:
ifeq ($(shell grep "artifact: deploy.zip" .elasticbeanstalk/config.yml), )
	@echo "You must configure elasticbeanstalk to deploy an artifact."
	@echo "Add the following to your .elasticbeanstalk/config.yml"
	@echo "deploy:\n  artifact: deploy.zip"
else
	@make build
	git archive -o deploy.zip HEAD
	zip -rv deploy.zip build
	eb deploy -l $$(git rev-parse --verify --short=5 HEAD) -m "$$(git log -1 --pretty=%s)"
endif

translations:
	./src/scripts/build-locales locales/translations.json

webpack:
	$(WEBPACK) --bail

# ------------------------------------

start:
	$(NODE) ./server/index.js

# ------------------------------------

test:
	@make lint
	@make build

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

# ------------------------------------

.PHONY: build clean deploy static translations webpack watch stop start test lint
