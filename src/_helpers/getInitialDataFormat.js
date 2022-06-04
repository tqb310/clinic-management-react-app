import {formatDate} from './handleDate';
import {handleMinute} from '_constants/date';

export function getInitialPatientDataFormat(data) {
    if (data) {
        return {
            patient: {
                patient_name:
                    data.last_name + ' ' + data.first_name,
                phone: data.phone,
                dob: formatDate(data.dob),
                occupation: data.occupation,
                identity_number: data.identity_number,
                height: data.height,
                weight: data.weight,
                gender: data.gender,
                note: data.note || '',
                address: {
                    province: '',
                    district: '',
                    ward: '',
                    details: '',
                },
            },
        };
    }
    return {};
}

export function getInitialAppointmentDataFormat(data) {
    if (data) {
        return {
            ...getInitialPatientDataFormat(data),
            appointment: {
                type: data.type || 0,
                date: formatDate(data?.date),
                hour: (
                    data?.time.split(':')[0] * 1
                ).toString(),
                minute: handleMinute(
                    data?.time.split(':')[1],
                ),
            },
        };
    }
    return {};
}
