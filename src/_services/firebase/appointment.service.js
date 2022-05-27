import {
    doc,
    getDoc,
    collection,
    getDocs,
    setDoc,
    query,
    where,
} from 'firebase/firestore';
import patientService from './patient.service';
import {db} from './app';

const appointmentRef = collection(db, 'appointments');

const appointmentServices = {
    async getDocsAll(patients) {
        try {
            // console.log('PATIENTS: ', patients);
            const snapshot = await getDocs(appointmentRef);
            let appointments = [];
            snapshot.forEach((doc, index) => {
                appointments.push({...doc.data()});
            });
            const results = appointments.map(
                async (appointment, index) => {
                    if (patients && patients.length) {
                        let tempData = patients.find(
                            patient =>
                                patient.id ===
                                appointment.patient_id,
                        );
                        //Get rid of patient_id
                        const {id, ...rest} = tempData;
                        return Object.assign(
                            appointment,
                            rest,
                        );
                    }
                    //In case of not fetched patient data yet
                    const dataFromDB =
                        await patientService.getDocById(
                            appointment.patient_id.toString(),
                        );

                    //Get rid of patient_id
                    const {id, ...rest} = dataFromDB;
                    return Object.assign(appointment, rest);
                },
            );
            return Promise.all(results);
        } catch (error) {
            throw error;
        }
    },

    async getDocById(id) {
        try {
            const docRef = doc(appointmentRef, id);
            const result = await getDoc(docRef);
            return result.data();
        } catch (error) {
            throw error;
        }
    },

    async getDocByDate(date, patients) {
        try {
            const q = query(
                appointmentRef,
                where('date', '==', '26/05/2022'),
            );
            const snapshot = await getDocs(q);
            const appointments = [];
            snapshot.forEach(doc => {
                appointments.push(doc.data());
            });
            const results = appointments.map(
                async (appointment, index) => {
                    if (patients && patients.length) {
                        let tempData = patients.find(
                            patient =>
                                patient.id ===
                                appointment.patient_id,
                        );
                        //Get rid of patient_id
                        const {id, ...rest} = tempData;
                        return Object.assign(
                            appointment,
                            rest,
                        );
                    }
                    //In case of not fetched patient data yet
                    const dataFromDB =
                        await patientService.getDocById(
                            appointment.patient_id.toString(),
                        );

                    //Get rid of patient_id
                    const {id, ...rest} = dataFromDB;
                    return Object.assign(appointment, rest);
                },
            );
            return Promise.all(results);
        } catch (error) {
            throw error;
        }
    },

    async update(aid, pid, data) {
        try {
            const docRef = doc(appointmentRef, aid);
            const patientRes = await patientService.update(
                pid,
                data.patient,
            );
            const appointmentRes = await setDoc(
                docRef,
                data.appointment,
                {
                    merge: true,
                },
            );
            return {
                patientRes,
                appointmentRes,
            };
        } catch (error) {
            throw error;
        }
    },
};

export default appointmentServices;
