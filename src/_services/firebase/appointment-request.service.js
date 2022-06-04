import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    deleteDoc,
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

    async addAppointmentRequest(data) {
        try {
            await addDoc(appointmentRequestRef, {
                ...data,
            });
        } catch (error) {
            throw error;
        }
    },

    async updateAppointmentRequest(id, data) {
        try {
            await setDoc(
                doc(appointmentRequestRef, id.toString()),
                data,
                {merge: true},
            );
        } catch (error) {
            throw error;
        }
    },

    async deleteAppointmentRequest(id) {
        try {
            await deleteDoc(
                doc(appointmentRequestRef, id.toString()),
            );
        } catch (error) {
            throw error;
        }
    },
};

export default appointmentRequestServices;
