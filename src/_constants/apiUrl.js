export const auth = {
    login: '/login',

}

export const appointment = {
    getAllAppointment: '/reception/appointment',
    getAppointmentByWeek: '/reception/appointment-by-week',
    getAllAppointmentRequest: '/reception/appointment-request'
}

export const diagnostic = {
    createDiagostic: '/reception/diagnostic',
    getDiagnostic: './reception/diagnostic-stack',
    getRoom: '/doctor/room',
    getDiagnosticStackByRoom: '/doctor/stack',

    updateDiagnostic: '/doctor/diagnostic'
}
//Them tat ca url cua api vao day