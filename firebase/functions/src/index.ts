import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();

// on write let's generate the file
exports.onSavePOI = functions.firestore
  .document('poi/{poi}')
  .onCreate((snap, context) => { 
    return generateData().then( (data) => {
        const storage = admin.storage().bucket();

        const contentType = "text/json";
        const ref = storage.file('poi/poi.gjson');
        const metadata = {
            contentType: contentType,
            cacheControl: 'public,max-age=0',
            gzip: true
        };

        ref.save(JSON.stringify(data), metadata)
        .then((res) => {
            return ref.makePublic()
        }).catch((err) => {
            console.log(err);
        }).catch(() => {
            console.log("err");
        });
    });
});



async function generateData(): Promise<any> {
    const db = admin.firestore();
    const poiRef = db.collection('poi');
    return poiRef.get()
        .then((querySnapshot) => {
        const features = <any>[];
        querySnapshot.forEach(doc => {
            const poiData = doc.data();
            const poi = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [poiData.location.longitude,poiData.location.latitude]
                },
                "properties": {
                    "title": poiData.title,
                    "address": poiData.address,
                    "image": poiData.image,
                    "url": poiData.url
                }
            }
            features.push( poi);
        });

        const ret = {
            "type": "FeatureCollection",
            "features": features,
        };
        return new Promise((resolve, reject) => { resolve(ret)});
    }).catch((err) => {
        console.log(err);
        return new Promise((resolve, reject) => { reject(err)});
    });
}

export const generateGeoJSON = functions.https.onRequest( (request, response) => {
        return generateData().then( (data) => {
            const contentType = "text/json";
            response.set("Content-Type", contentType);
            response.status(200).send(data)
        });
});
