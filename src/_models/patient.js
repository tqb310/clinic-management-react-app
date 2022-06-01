import {formatDate} from '_helpers/handleDate';
import {getLocationName} from '_contexts/LocationContext';

export default function getPatientModel(values) {
    const result = {};

    for (let key in values) {
        if (!values[key]) continue;
        if (key === 'patient_name') {
            /* */
            const tempName =
                values.patient_name?.split(' ');
            result['first_name'] =
                tempName[tempName.length - 1];
            result['last_name'] = tempName
                .slice(0, tempName.length - 1)
                .join(' ');
            /* */
        } else if (key === 'dob') {
            /* */
            result[key] =
                typeof values.dob === 'string'
                    ? values.dob
                    : formatDate(
                          values.dob.toLocaleDateString(),
                          '',
                          'm/d/y',
                      );
            /* */
        } else if (key === 'address') {
            /* */
            for (let addressKey in values[key]) {
                if (values[key][addressKey]) {
                    if (addressKey === 'details')
                        result[addressKey] =
                            values[key][addressKey];
                    else
                        result[addressKey] =
                            getLocationName(
                                addressKey,
                                values[key][addressKey],
                            );
                }
            }
            /* */
        } else {
            /* */
            result[key] = values[key];
        }
    }
    return result;
}
