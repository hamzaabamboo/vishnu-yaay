import firebase from "firebase";
import config from "./config";

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const db = firebase.firestore();
export const provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
