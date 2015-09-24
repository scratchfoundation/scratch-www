ESLINT=./node_modules/.bin/eslint
NODE=node
WATCH=./node_modules/.bin/watch
WEBPACK=./node_modules/.bin/webpack

# ------------------------------------

build:
	@make clean
	@make static
	@make webpack

clean:
	rm -rf ./build
	mkdir -p build

static:
	cp -a ./static/. ./build/

webpack:
	$(WEBPACK)

# ------------------------------------

watch:
	$(WATCH) "make clean && make static" ./static &
	$(WEBPACK) -d --watch &
	wait

stop:
	pkill -f "node $(WEBPACK) -d --watch"
	pkill -f "node $(WATCH) make clean && make static ./static"

start:
	$(NODE) ./server/index.js

# ------------------------------------

nginx_conf:
	node server/nginx.js

# ------------------------------------

test:
	@make lint

lint:
	$(ESLINT) ./*.js
	$(ESLINT) ./server/*.js
	$(ESLINT) ./src/*.js
	$(ESLINT) ./src/*.jsx
	$(ESLINT) ./src/mixins/*.jsx
	$(ESLINT) ./src/views/**/*.jsx
	$(ESLINT) ./src/components/**/*.jsx

# ------------------------------------

.PHONY: build clean static webpack watch stop start nginx_conf test lint
