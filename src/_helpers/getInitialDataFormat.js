import {formatDate} from './handleDate';
export default function getInitialDataFormat(data) {
    if (data) {
        return {
            PATIENT_NAME:
                data.last_name + ' ' + data.first_name,
            PATIENT_PHONE: data.phone,
            DATE_OF_BIRTH: formatDate(data.dob),
            OCCUPATION: data.occupation,
            IDENTITY_NUMBER: data.identity_number,
            HEIGHT: data.height,
            WEIGHT: data.weight,
            PATIENT_GENDER: data.gender,
            NOTE: data.note,
            PATIENT_TYPE: data.type || 0,
        };
    }
    return {};
}
