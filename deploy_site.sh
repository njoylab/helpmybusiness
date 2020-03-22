rm -rf firebase/public/
cd hugo
hugo --minify --config=config-prod.toml
cd ../firebase
firebase deploy --only hosting
