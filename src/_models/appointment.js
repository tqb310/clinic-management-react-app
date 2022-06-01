import {formatDate} from '_helpers/handleDate';

export default function getPatientModel(values) {
    const result = {};
    for (let key in values) {
        if (key === 'create_at') {
            result[key] = formatDate(
                new Date().toLocaleDateString(),
                '',
                'm/d/y',
            );
        } else if (key === 'date') {
            result[key] =
                typeof values.date === 'string'
                    ? formatDate(
                          values.date,
                          '',
                          'm/d/y',
                          true,
                      )
                    : formatDate(
                          values.date?.toLocaleDateString(),
                          '',
                          'm/d/y',
                          true,
                      );
        } else {
            result[key] = values[key];
        }
    }
    result['status'] = 1;
    return result;
}
