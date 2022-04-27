import {
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from './app';

// const userRef = collection(db, 'users');

const authentication = {
    logIn(email, password) {
        return signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
    },

    logOut() {
        return signOut(auth);
    },

    async getMe(uid) {
        try {
            const docRef = doc(db, 'users', uid);
            const userDoc = await getDoc(docRef);
            return userDoc.data();
        } catch (err) {
            throw err;
        }
    },
};

export default authentication;
