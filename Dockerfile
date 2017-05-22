# Start with an official Node LTS release.
FROM node:boron

# This will be the user that the app is run under
# rather than running as a privileged user.
ENV APP_USER "app"
RUN useradd --user-group --create-home --shell /bin/false $APP_USER

# Copy the package.json from the app to the
# container and install the node requirements.
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/scratch-www
WORKDIR $APP_DIR
COPY package.json $APP_DIR/package.json
RUN npm config set registry http://registry.npmjs.org/ \
    && npm set progress=false \
    && npm --loglevel error install \
    && rm -rf /tmp/* /root/.npm

# Now copy over the rest of the application source code.
# This is done AFTER the packages are installed so that
# unless the requirements are changed, the image from
# the steps up to this point can be reused.
#
# Note that to improve performance, files and folders to
# exclude are specified in the .dockerignore file.
COPY . $APP_DIR
RUN chown -R $APP_USER:$APP_USER $HOME/*
USER $APP_USER

RUN make clean && make translations

# Run webpack to build the static files
ENV WEBPACK=./node_modules/.bin/webpack
ENV NODE_ENV=production
RUN $WEBPACK

EXPOSE 8333

CMD ["make", "start"]
