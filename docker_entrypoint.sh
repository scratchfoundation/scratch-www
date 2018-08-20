#!/usr/bin/env bash

echo "App Entrypoint"

if [ ! -f /runtime/.translations ]; then
    echo "Generating intl/translations"
    make translations
    touch /runtime/.translations
fi

exec "$@"
