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
	$(ESLINT) ./src/{.,components/**,mixins,views/**}/*.jsx

# ------------------------------------

start:
	$(LIVE) ./build &
	make watch &
	wait

watch:
	$(WEBPACK) -d --watch &
	$(WATCH) "make static" ./static &
	$(WATCH) "make lint" ./src &
	wait

# ------------------------------------

.PHONY: build clean static webpack test lint start watch
