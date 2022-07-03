import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore';
import patientService from './patient.service';
import {formatDate} from '_helpers/handleDate';
import {db} from './app';

const invoiceRef = collection(db, 'invoices');

const invoiceServices = {
    /**
     * @async
     * @param {*} patients
     * @returns
     */
    async getDocsAll(patients) {
        try {
            // console.log('PATIENTS: ', patients);
            const snapshot = await getDocs(invoiceRef);
            let invoices = [];
            snapshot.forEach((doc, index) => {
                invoices.push({...doc.data(), id: doc.id});
            });
            const results = invoices.map(
                async (invoice, index) => {
                    if (patients && patients.length) {
                        let tempData = patients.find(
                            patient =>
                                patient.id ===
                                invoice.patient_id,
                        );

                        return {
                            ...tempData,
                            ...invoice,
                        };
                    }
                    //In case of not fetched patient data yet
                    const dataFromDB =
                        await patientService.getDocById(
                            invoice.patient_id.toString(),
                        );

                    //Get rid of patient_id
                    const {id, ...rest} = dataFromDB;
                    return Object.assign(invoice, rest);
                },
            );
            return Promise.all(results);
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} id
     * @returns
     */
    async getDocById(invoice_id) {
        try {
            const docRef = doc(
                invoiceRef,
                invoice_id.toString(),
            );
            const invoiceResult = await getDoc(docRef);
            const patientResult =
                await patientService.getDocById(
                    invoiceResult
                        .data()
                        ?.patient_id?.toString(),
                );
            const {id, ...rest} = patientResult;
            return {
                ...invoiceResult.data(),
                ...rest,
                id: invoiceResult.id,
            };
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} id
     * @returns
     */
    async getNumberOfTodayDocs() {
        try {
            const q = query(
                invoiceRef,
                where(
                    'create_at',
                    '==',
                    formatDate(
                        new Date().toLocaleDateString(),
                        '',
                        'm/d/y',
                        true,
                    ),
                ),
            );
            const snapshot = await getDocs(q);
            return snapshot.size;
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     */
    async getRevenue() {
        try {
            const snapshot = await getDocs(invoiceRef);
            let revenue = 0;
            if (snapshot.size) {
                snapshot.forEach(doc => {
                    if (doc.data().total_fee) {
                        revenue += doc.data().total_fee;
                    }
                });
            }
            return revenue;
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     */
    async getVisitsEachMonth() {
        try {
            const snapshot = await getDocs(invoiceRef);
            let data = new Array(12).fill(0);
            if (snapshot.size) {
                snapshot.forEach(doc => {
                    let createAt = new Date(
                        formatDate(doc.data().create_at),
                    );
                    data[createAt.getMonth()]++;
                });
            }
            return data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} data
     * @returns
     */
    async addInvoice(data) {
        try {
            const res = await addDoc(invoiceRef, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     *
     * @param {*} id
     * @param {*} data
     * @returns
     */
    async updateInvoice(id, data) {
        try {
            const res = await setDoc(
                doc(invoiceRef, id.toString()),
                data,
                {merge: true},
            );
            return res;
        } catch (error) {
            throw error;
        }
    },
    async deleteInvoice(id) {
        try {
            await deleteDoc(doc(invoiceRef, id.toString()));
        } catch (error) {
            throw error;
        }
    },
    async deleteInvoiceBatch(idList) {
        try {
            idList.forEach(async id => {
                await this.deleteInvoice(id);
            });
        } catch (error) {
            throw error;
        }
    },
};

export default invoiceServices;
