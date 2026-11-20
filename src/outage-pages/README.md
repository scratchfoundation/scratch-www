# Maintenance and Trouble Status Pages

Fastly serves these pages in place of the website when the backend systems can't respond, either for planned
maintenance or because of some other trouble.

Both pages are built from `template.ejs` by webpack, with the per-page text in `pages.js`, into
`build/cdn/maintenance.html` and `build/cdn/trouble.html`. Each deploy copies them into Fastly response objects, which
are limited to 65535 characters, and the build fails if a page is longer. That's why only the illustration (in
`images/`) is inlined. The other images load from the `scratch-maintenance` S3 bucket, which stays up while the site is
down.

## maintenance.html

A general message about work being performed on the systems

## trouble.html

A message about trouble occurring that is currently being worked on.
