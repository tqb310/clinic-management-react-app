import {
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from './app';
// const userRef = collection(db, 'users');

const authentication = {
    /**
     * @async
     * @param {*} email
     * @param {*} password
     */
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
    /**
     * @async
     */
    async logOut() {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} uid
     * @returns
     */
    async getMe(uid) {
        try {
            const docRef = doc(db, 'users', uid);
            const userDoc = await getDoc(docRef);
            return {...userDoc.data(), id: userDoc.id};
        } catch (error) {
            throw error;
        }
    },
};

export default authentication;
