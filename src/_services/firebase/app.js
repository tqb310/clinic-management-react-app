import * as firebase from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAckNtonObKKjAVx1HsYLROT9gH_brpjlA',
    authDomain: 'project-demo-18310.firebaseapp.com',
    databaseURL:
        'https://project-demo-18310.firebaseio.com',
    projectId: 'project-demo-18310',
    storageBucket: 'project-demo-18310.appspot.com',
    messagingSenderId: '764104046491',
    appId: '1:764104046491:web:ef3408cf0f95698f6c133e',
    measurementId: 'G-GDDPFNJ5K1',
};

let app = null;

if (!firebase.getApps().length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}

export const auth = getAuth();

export const db = getFirestore();

export default app;
