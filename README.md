### HUGO

containts the [HUGO](https://gohugo.io/) project that generate the static website

### Firebase

contains the static website generated from HUGO and the firebase function that generate the geojson


## Frontend

### Configuration

edit hugo/config.toml

```
[params]
    MapboxAccessToken = <Map Box Key>
    MapboxTheme = <The Map Box Theme you'd like to use> // Es: mapbox://styles/mapbox/light-v10
    GooglePlacesKey = <Key from Google Places>>
    GeoJSON = <Generated GeoJSON file goes here>
    EnableIPtoCoords = true|false // if you want to geolocalize the user from the IP address using https://ipapi.co
    FirestoreCollection = "poi" // Name of the firestore collection
    FiresBaseHosting = true|false // If you plan to deploy the site on firebase hosting
  // here you can explicit your FireBase configuration in case you don't deploy on Firebase Hosting
    FirebaseApiKey = ""
    FirebaseApiKeyAuthDomain = ""
    FirebaseProjectId = ""
    FirebaseAppId = ""
    FirebaseMeasurementId = ""
```


#### dev site

After you've compiled the config File you can start hugo server locally

```
cd hugo
hugo server -D
```

#### deploy site

If you want to deploy on Firebase you need this command

Remove old generated files
`rm -rf firebase/public/`

Generate new static files using a specific configuration file for production

```
cd hugo
hugo --minify --config=config-prod.toml
```

Deploy to Firebase Hosting

```
cd ../firebase
firebase deploy --only hosting
```


## Backend

#### deploy functions

It has 1 function written in TypeScript that generates and upload the geojson file to Firebase Storage each time a POI is added

```
cd firebase
firebase deploy --only functions
```

## CORS

To allow access to your geojson file uploaded to Firebase you might need to set CORS access:
Edit firebase/cors.json adding your URL and then

`gsutil cors set cors.json gs://<YOUR-BUCKET-PROJECT-URL>`
