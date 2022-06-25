import {
    doc,
    getDoc,
    collection,
    getDocs,
    setDoc,
    addDoc,
} from 'firebase/firestore';
import {db} from './app';

const employeeRef = collection(db, 'users');

const employeeServices = {
    /**
     * @async
     * @returns
     */
    async getDocsAll() {
        try {
            const snapshot = await getDocs(employeeRef);
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
            const docRef = doc(employeeRef, id);
            const result = await getDoc(docRef);
            return {...result.data(), id: result.id};
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
            const docRef = doc(employeeRef, id);
            setDoc(docRef, data, {merge: true});
        } catch (error) {
            throw error;
        }
    },

    async addEmployee(data) {
        try {
            const res = await addDoc(employeeRef, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
};

export default employeeServices;
