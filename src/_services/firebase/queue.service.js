import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import {db} from './app';

const queueRef = collection(db, 'queues');
const invoiceRef = collection(db, 'invoices');

const queueServices = {
    async getDocsAll() {
        try {
            const snapshot = await getDocs(queueRef);
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
            const docRef = doc(queueRef, id);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },

    async getAllInvoicesOfAQueue(id) {
        const q = query(
            invoiceRef,
            where('queue_id', '==', id),
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

export default queueServices;
