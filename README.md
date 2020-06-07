# Simulator Core

# setup
after installing node:
```sh
$ npm install
$ npm run start-web
```
then browsing to http://localhost:8080 should show you the results. any changes made to the code will cause a reload.

# using as a module (local development)
```sh
$ npm install
$ npm run build
$ npm link
```

Then in the project you want to use this module in, run:

```sh
$ npm link @fruk/simulator-core
```