import {
    doc,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore';
import {db} from './app';

const patientRef = collection(db, 'patients');

const patientServices = {
    async getDocsAll() {
        try {
            const snapshot = await getDocs(patientRef);
            let result = [];
            snapshot.forEach((doc, index) => {
                result.push({...doc.data()});
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getDocById(id) {
        try {
            const docRef = doc(patientRef, id);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },
};

export default patientServices;
