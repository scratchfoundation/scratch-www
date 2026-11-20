# Maintenance and Trouble Status Pages

Fastly serves these pages in place of the website when the backend systems can't respond, either for planned
maintenance or because of some other trouble.

Both pages are built from `template.ejs` by webpack, with the per-page text in `pages.js`. Every image is inlined, so
each built page (`build/cdn/maintenance.html` and `build/cdn/trouble.html`) is a single self-contained file.

## maintenance.html

A general message about work being performed on the systems

## trouble.html

A message about trouble occurring that is currently being worked on.
