export const auth = {
    login: '/login',

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


//Them tat ca url cua api vao day