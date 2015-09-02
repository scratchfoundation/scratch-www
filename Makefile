ESLINT=./node_modules/.bin/eslint
LIVE=./node_modules/.bin/live-server
WATCH=./node_modules/.bin/watch
WEBPACK=./node_modules/.bin/webpack

# ------------------------------------

build:
	@make clean
	@make static
	@make webpack

clean:
	rm -rf ./build/*.*
	mkdir -p build

static:
	cp -a ./static/. ./build/

webpack:
	$(WEBPACK)

# ------------------------------------

test:
	@make lint

lint:
	$(ESLINT) ./*.js
	$(ESLINT) ./src/*.jsx
	$(ESLINT) ./src/mixins/*.jsx
	$(ESLINT) ./src/views/**/*.jsx
	$(ESLINT) ./src/components/**/*.jsx

# ------------------------------------

start:
	@make watch
	$(LIVE) ./build --port=8888 --wait=200 --no-browser

watch:
	$(WEBPACK) -d --watch &
	$(WATCH) "make static" ./static &
	wait

# ------------------------------------

.PHONY: build clean static webpack test lint start watch
