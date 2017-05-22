# Integration Tests

These tests verify the integration with the Scratch APIs, and are written
using the [Nightwatch.js](http://nightwatchjs.org/) automated testing framework.
To run them locally, you will need a working
[Nightwatch.js installation](http://nightwatchjs.org/getingstarted#installation).

You can run these integration tests against the application that is running in
a docker container on your local machine.

# Docker Container Setup
* You first need some basic understanding of how Docker works and have a
working [Docker installation](https://docs.docker.com/engine/installation/).
* We will be running 3 containers:
  * scratch-www
  * selenium standalone with firefox (for this we use an offical image from DockerHub)
  * these tests, driving Firefox against the running scratch-www app

# Running the Nightwatch tests
```bash
docker-compose run --rm scratch-test make test
```
# Developing tests
Note that the contents of this test/integration folder are linked between host machine
and container, so you can edit them from either environment.
This works because the volume is specified in docker-compose.override.yml, which
is loaded automatically if you do not specify a docker-compose configuration file
with the -f option.
```bash
docker-compose run --rm scratch-test bash
```
From the shell of the scratch-test machine you can kick off the tests with:
```bash
make test
```

# Cleanup
## Delete all running and stopped continers
```bash
docker-compose down
docker rm -f $(docker ps -aq)
```
