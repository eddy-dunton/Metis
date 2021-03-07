#!/bin/sh
git checkout prod
get reset --hard
git pull
npm i
cd react-frontend
npm i
npm run build
