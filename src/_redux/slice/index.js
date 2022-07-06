import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';
import appointmentRequestReducer from './appointmentRequestSlice';
import invoiceReducer from './invoiceSlice';
import currentUserReducer from './currentUserSlice';
import queueReducer from './queueSlice';
import notificationReducer from './notificationSlice';
import employeeReducer from './employeeSlice';

const rootReducer = {
    patients: patientReducer,
    appointments: appointmentReducer,
    invoices: invoiceReducer,
    user: currentUserReducer,
    appointmentRequests: appointmentRequestReducer,
    queues: queueReducer,
    notification: notificationReducer,
    employees: employeeReducer,
};

export default rootReducer;
