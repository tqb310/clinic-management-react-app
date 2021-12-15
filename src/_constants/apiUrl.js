export const auth = {
    login: '/login',
    changPass: '/user/password'
}

export const appointment = {
    getAllAppointment: '/reception/appointment',
    getAppointmentByWeek: '/reception/appointment-by-week',
    getAllAppointmentRequest: '/reception/appointment-request',
    confirmRequest: '/reception/appointment-request/',
    createAppointmentRequest: '/customer/appointment-request'
}

export const diagnostic = {
    createDiagostic: '/reception/diagnostic',
    getDiagnostic: '/reception/diagnostic-stack',
    getAllDiagnostic: '/reception/diagnostic',
    getRoom: '/doctor/room',
    getDiagnosticStackByRoom: '/doctor/stack',
    updateDiagnostic: '/doctor/diagnostic',
    getDiagnosticById: '/reception/diagnostic/',
}

export const employee = {
    getAllEmployee: '/manager/employees',
    createEmployee: '/manager/employees'
}

export const services = {
    getAllServices: '/manager/medical-examination-fee',
    postService: '/manager/medical-examination-fee',
    updateFee: '/manager/medical-examination-fee',
    getAllServicesUser: '/user/medical-examination-fee',
}
//Them tat ca url cua api vao day