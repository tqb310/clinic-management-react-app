import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
    setDoc,
    addDoc,
} from 'firebase/firestore';
import {db} from './app';

const patientRef = collection(db, 'patients');
const invoiceRef = collection(db, 'invoices');

const patientServices = {
    /**
     * @async
     * @returns
     */
    async getDocsAll() {
        try {
            const snapshot = await getDocs(patientRef);
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
            const docRef = doc(patientRef, id);
            const result = await getDoc(docRef);
            return {...result.data(), id: result.id};
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} id
     * @returns
     */
    async getAllInvoicesOfAPatient(id) {
        const q = query(
            invoiceRef,
            where('patient_id', '==', id),
        );
        try {
            const snapshot = await getDocs(q);
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
     * @param {*} data
     */
    async update(id, data) {
        try {
            const docRef = doc(patientRef, id);
            setDoc(docRef, data, {merge: true});
        } catch (error) {
            throw error;
        }
    },

    async addPatient(data) {
        try {
            const res = await addDoc(patientRef, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
};

export default patientServices;
