rm -rf firebase/public/
cd hugo
hugo --minify --config=config-prod.toml
cp redirect.html ../firebase/public/index.html
cd ../firebase
firebase deploy --only hosting
