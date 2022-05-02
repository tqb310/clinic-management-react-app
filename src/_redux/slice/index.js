import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';
import appointmentRequestReducer from './appointmentRequestSlice';
import invoiceReducer from './invoiceSlice';
import currentUserReducer from './currentUserSlice';
import queueReducer from './queueSlice';

const rootReducer = {
    patients: patientReducer,
    appointments: appointmentReducer,
    invoices: invoiceReducer,
    user: currentUserReducer,
    appointmentRequests: appointmentRequestReducer,
    queues: queueReducer,
};

export default rootReducer;
