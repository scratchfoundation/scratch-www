# Start with an official Node LTS release.
FROM node:boron

# This will be the user that the app is run under
# rather than running as a priviliged user.
RUN useradd --user-group --create-home --shell /bin/false test

# Global install nightwatch in the quickest way possible
RUN npm config set registry http://registry.npmjs.org/ \
    && npm set progress=false \
    && npm --loglevel warn install -g nightwatch \
    && rm -rf /tmp/* /root/.npm
ENV APP_USER "test"
ENV APP_NAME "integration"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME
WORKDIR $APP_DIR

# Note that to improve performance, files and folders to
# exclude are specified in the .dockerignore file.
COPY . $APP_DIR
RUN chown -R $APP_USER:$APP_USER $HOME/*
USER $APP_USER

CMD ["make", "test"]
