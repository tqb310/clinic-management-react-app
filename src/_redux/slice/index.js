import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';
import invoiceReducer from './invoiceSlice';
import currentUserReducer from './currentUserSlice';

const rootReducer = {
    patients: patientReducer,
    appointments: appointmentReducer,
    invoices: invoiceReducer,
    user: currentUserReducer,
};

export default rootReducer;
