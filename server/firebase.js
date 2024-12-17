const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDocs, collection, updateDoc } = require("firebase/firestore")
require('dotenv').config();

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

let firestoreDb;
let app;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore();
        return app;
    } catch (error) {
        console.log(error);
    }
};

const fetchPicksData = async () => {
    const data = { };

    try {
        const collectionRef = collection(firestoreDb, "Picks");
        const weekSnapshot = await getDocs(collectionRef);

        for(const week of weekSnapshot.docs) {
            const gamesCollection = collection(week.ref, "Games");
            const gameSnapshot = await getDocs(gamesCollection);
            
            const gamesData = { "Games" : { } };

            for(const game of gameSnapshot.docs) {
                const picksCollection = collection(game.ref, "picks");
                const picksSnapshot = await getDocs(picksCollection);

                const picks = { };

                for(const pick of picksSnapshot.docs) {
                    picks[pick.id] = pick.data().Pick;
                }

                gamesData.Games[game.id] = { ...game.data(), picks };
                gamesData["startTime"] = week.data().startTime;

            }
            
            data[week.id] = gamesData;
        }
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
};

const uploadProcessData = async () => {
    const dataToUpload = {
        key1: "test",
        key2: true,
        key3: new Date(),
    };
    try {
        const document = doc(firestoreDb, "Picks", "Week3");
        await setDoc(document, dataToUpload);
        return "success";
    } catch (error) {
        console.log("Error updating", error);
        throw error;
    }
};

const uploadPicksData = async (data) => {
    try {
        const weekDoc = doc(firestoreDb, "Picks", data.Week);
        const gameDoc = doc(weekDoc, "Games", data.GameId);
        const pickDoc = doc(gameDoc, "picks", data.User);

        await updateDoc(pickDoc, {
            "Pick": data.Pick
        });

        return "Success";
    } catch(error) {
        console.log("Error updating", error);
        throw error;
    }
}

const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessData, 
    fetchPicksData,
    uploadPicksData
}