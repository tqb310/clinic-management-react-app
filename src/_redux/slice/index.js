import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';

const rootReducer = {
    patients: patientReducer,
    appointments: appointmentReducer,
};

export default rootReducer;
