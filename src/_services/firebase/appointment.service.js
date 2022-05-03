import {
    doc,
    getDoc,
    collection,
    getDocs,
    setDoc,
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

    async update(id, data) {
        try {
            const docRef = doc(appointmentRef, id);
            setDoc(docRef, data);
        } catch (error) {
            throw error;
        }
    },
};

export default appointmentServices;
