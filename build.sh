#!/bin/sh
git reset --hard
git checkout prod
git pull
npm i
cd react-frontend
npm i
