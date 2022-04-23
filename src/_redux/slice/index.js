import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';
import invoiceSlice from './invoiceSlice';

const rootReducer = {
    patients: patientReducer,
    appointments: appointmentReducer,
    invoices: invoiceSlice,
};

export default rootReducer;
