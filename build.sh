#!/bin/sh
git checkout prod
git pull
npm i
cd react-frontend
npm i
npm run build
