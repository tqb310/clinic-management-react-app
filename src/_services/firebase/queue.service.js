import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
    addDoc,
} from 'firebase/firestore';
import patientServices from './patient.service';
import invoiceServices from './invoice.service';
import appointmentServices from './appointment.service';
import {formatDate} from '_helpers/handleDate';
import getOrderNumber from '_helpers/getNumecialOrder';
import {queueModel} from '_models';
import {db} from './app';

const queueRef = collection(db, 'queue');

const queueServices = {
    /**
     * @async
     * @returns
     */
    async getDocsAll() {
        try {
            const snapshot = await getDocs(queueRef);

            const queue = [];
            snapshot.forEach(async (doc, index) => {
                queue.push({...doc.data(), id: doc.id});
            });
            const result = queue.map(async item => {
                const {first_name, last_name, dob, gender} =
                    await patientServices.getDocById(
                        item.patient_id,
                    );
                const invoiceData =
                    await invoiceServices.getDocById(
                        item.invoice_id,
                    );
                const {status, ...rest} = invoiceData;
                return {
                    ...item,
                    ...rest,
                    first_name,
                    last_name,
                    dob,
                    gender,
                };
            });

            return Promise.all(result);
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
            const docRef = doc(queueRef, id);
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
    async getDocsByStatus(status) {
        const q = query(
            queueRef,
            where('status', '==', status),
        );
        try {
            const snapshot = await getDocs(q);
            let queue = [];
            snapshot.forEach(async (doc, index) => {
                queue.push({...doc.data(), id: doc.id});
            });
            const result = queue.map(async item => {
                const {first_name, last_name, dob, gender} =
                    await patientServices.getDocById(
                        item.patient_id,
                    );
                const invoiceData =
                    await invoiceServices.getDocById(
                        item.invoice_id,
                    );
                //Get rid of invoice status
                const {status, ...rest} = invoiceData;
                return {
                    ...item,
                    ...rest,
                    first_name,
                    last_name,
                    dob,
                    gender,
                };
            });
            return Promise.all(result);
        } catch (error) {
            throw error;
        }
    },
    async getNumberEachStatus() {
        try {
            const initialData = {
                serving: 0,
                waiting: 0,
                missed: 0,
            };
            const queue = await this.getDocsAll();
            if (queue && queue.length) {
                const data = queue.reduce(
                    (result, item) => {
                        switch (item.status) {
                            case 0:
                                result.missed++;
                                break;
                            case 1:
                                result.waiting++;
                                break;
                            case 2:
                                result.serving++;
                                break;
                            default:
                                break;
                        }
                        return result;
                    },
                    initialData,
                );
                return data;
            }
            return initialData;
        } catch (error) {
            throw error;
        }
    },
    /**
     *
     * @param {*} data
     * @returns
     */
    async addToQueue(data) {
        try {
            //Get the lastest number
            const snapshot = await getDocs(queueRef);
            const finalData = {
                ...data,
                numerical_order: snapshot.size + 1,
            };

            //Get rid of numercial order of patients who made an appointment
            const todayAppointment =
                await appointmentServices.getDocByDate(
                    formatDate(
                        new Date().toLocaleDateString(),
                        '',
                        'd/m/y',
                        true,
                    ),
                );

            if (
                todayAppointment &&
                todayAppointment.length
            ) {
                for (const appointment of todayAppointment) {
                    if (
                        getOrderNumber(appointment.time) ===
                        finalData.numerical_order
                    )
                        finalData.numerical_order++;
                    else break;
                }
            }

            //Submit data
            const res = await addDoc(queueRef, finalData);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} data
     */
    async addToQueueWithAppointment(data) {
        try {
            //Add an invoice
            const invoiceRes =
                await invoiceServices.addInvoice({
                    patient_id: data.patientId,
                    services: [1],
                    create_at: formatDate(
                        new Date().toLocaleDateString(),
                        '',
                        'm/d/y',
                        true,
                    ),
                    type: data.type,
                    status: 0,
                });
            //Add to queue
            this.addToQueue({
                patient_id: data.patientId?.toString(),
                invoice_id: invoiceRes.id,
                ...queueModel(),
            });
        } catch (error) {
            throw error;
        }
    },
};

export default queueServices;
