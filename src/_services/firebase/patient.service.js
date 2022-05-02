import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import {db} from './app';

const patientRef = collection(db, 'patients');
const invoiceRef = collection(db, 'invoices');

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

    async getAllInvoicesOfAPatient(id) {
        const q = query(
            invoiceRef,
            where('patient_id', '==', id),
        );
        try {
            const snapshot = await getDocs(q);
            let result = [];
            snapshot.forEach((doc, index) => {
                result.push({...doc.data()});
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default patientServices;
