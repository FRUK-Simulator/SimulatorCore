# Simulator Core

# setup

after installing node:

```sh
$ npm install
$ npm run start-web
```

then browsing to http://localhost:8080 should show you the results. any changes made to the code will cause a reload.

## Adding a New Demo

To add a new demo for local development / testing purposes, follow these steps:

1. Add a new Canvas to the index.html file

```
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <canvas id="demo1" width="800" height="600"></canvas>
    + <canvas id="demo2" width="800" height="600"></canvas>
    <!-- NOTE: SCRIPTS WILL BE AUTOMATICALLY ADDED BY WEBPACK BELOW THIS COMMENT -->
  </body>
</html>
```

2. Add a new demo file to [src/demos](src/demos/)
3. Add the demo to the [webpack.config.js](webpack.config.js) in the entry points object

```
entry: {
    demo1: "./src/demos/demo1.ts",
    demo2: "./src/demos/demo2.ts"
},
```

4. Run `npm run start-web`. At this point, any changes you make to your new demo file should be reflected on [localhost:8080](http://localhost:8080)

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
