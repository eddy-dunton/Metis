#!/bin/sh
get reset --hard
git checkout prod
git pull
npm i
cd react-frontend
npm i
