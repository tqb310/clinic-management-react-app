import {
    doc,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore';
import {db} from './app';

const appointmentRequestRef = collection(
    db,
    'appointment_requests',
);

const appointmentRequestServices = {
    async getDocsAll() {
        try {
            const snapshot = await getDocs(
                appointmentRequestRef,
            );
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
            const docRef = doc(appointmentRequestRef, id);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },
};

export default appointmentRequestServices;
