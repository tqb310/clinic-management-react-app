import axiosClient from './axiosClient';
import {appointment as appoimentUrl} from '_constants/apiUrl';
import authentication from '_services/authentication.service';

const appointment = {
    async getAllAppointment() {
        try {
            const appointmentData = await axiosClient.get(
                appoimentUrl.getAllAppointment,
                {
                    headers: {
                        access_token:
                            authentication.getCurrentUser()
                                .token,
                    },
                },
            );
            console.log(appointmentData);
        } catch (error) {
            console.log(error);
        }
    },
    async getAppointmentByWeek(date) {
        try {
            const appointmentData = await axiosClient.post(
                appoimentUrl.getAppointmentByWeek,
                {date: date},
                {
                    headers: {
                        access_token:
                            authentication.getCurrentUser()
                                .token,
                    },
                },
            );
            return appointmentData;
        } catch (error) {
            console.log(error);
            switch (error.response.status) {
                case 401:
                    return undefined;
                case 500:
                    return null;
                default:
                    return null;
            }
        }
    },
    async getAllAppointmentRequest() {
        try {
            const request = await axiosClient.get(
                appoimentUrl.getAllAppointmentRequest,
                {
                    headers: {
                        access_token:
                            authentication.getCurrentUser()
                                .token,
                    },
                },
            );
            return request;
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    return undefined;
                case 401:
                    return null;
                default:
                    console.log('Lỗi Không xác định');
                    return undefined;
            }
        }
    },
    async confirmRequest(requestId, status) {
        try {
            const request = await axiosClient.put(
                appoimentUrl.confirmRequest + requestId,
                {status},
                {
                    headers: {
                        access_token:
                            authentication.getCurrentUser()
                                .token,
                    },
                },
            );
            return request;
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    return undefined;
                case 401:
                    return null;
                default:
                    console.log('Lỗi Không xác định');
                    return undefined;
            }
        }
    },
    async createAppointmentRequest(data) {
        try {
            const result = await axiosClient.post(
                appoimentUrl.createAppointmentRequest,
                data,
            );
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};

export default appointment;
