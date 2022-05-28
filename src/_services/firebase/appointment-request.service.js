import {
    doc,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore';
import {db} from './app';

const appointmentRequestRef = collection(
    db,
    'appointment-requests',
);

const appointmentRequestServices = {
    /**
     * @async
     * @returns
     */
    async getDocsAll() {
        try {
            const snapshot = await getDocs(
                appointmentRequestRef,
            );
            let result = [];
            snapshot.forEach((doc, index) => {
                result.push({...doc.data(), id: doc.id});
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} id
     * @returns
     */
    async getDocById(id) {
        try {
            const docRef = doc(appointmentRequestRef, id);
            const result = await getDoc(docRef);
            return {...result.data(), id: result.id};
        } catch (error) {
            throw error;
        }
    },
};

export default appointmentRequestServices;
