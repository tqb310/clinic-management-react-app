import {
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from './app';

// const userRef = collection(db, 'users');

const authentication = {
    async logIn(email, password) {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
        } catch (error) {
            throw error;
        }
    },

    async logOut() {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            throw error;
        }
    },

    async getMe(uid) {
        try {
            const docRef = doc(db, 'users', uid);
            const userDoc = await getDoc(docRef);
            return userDoc.data();
        } catch (error) {
            throw error;
        }
    },
};

export default authentication;