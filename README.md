## HUGO
containts the HUGO project that generate the static website

## Firebase
contains the static website generate from HUGO and the function that generate the geojson

## dev site
cd hugo
hugo server -D

## deploy site
rm -rf firebase/public/
cd hugo
hugo --minify
cd ../firebase
firebase deploy --only hosting

## deploy functions
cd firebase
firebase deploy --only functions
