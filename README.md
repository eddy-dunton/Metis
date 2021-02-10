# Metis

## Requirements
 - Node (N-API version 3, so just get the current latest version)
  - npm
  - A handful of braincells

## Development

### Installing dependencies

It is recommended to install the dependencies for both the frontend and the backend, as both are required to host a local development server.

In order to install the backend dependencies call ```npm i``` in the repo root

In order to install the frontend dependencies call ```npm i``` ```react-frontend```

### Building the frontend

If you're making changes to the frontend you'll have to call this everytime you make a change in order to get them to show when the page is visited 

This has to be called at least once even if you're working on the backend as it is required in order to run a local dev server

In ```react-frontend``` call ```npm run build```

### Hosting a local development server

A basic local development server can be run with

```node app.js```

This will run a local server on your system, accessible at ```localhost:3000```

nodemon is recommended if you're going to be making backend changes as this autorefreshes scripts which are changed whilst it is running

This can be installed globally with:

```npm install -g nodemon```

And then run with

```nodemon app.js```

### Pushing a production build

This is for git bash

```git checkout prod``` puts you in the production branch

```git merge main``` merges the main branch into the current (prod)

```git push``` pushes it to github
