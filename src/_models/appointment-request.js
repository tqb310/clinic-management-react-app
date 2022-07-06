import {formatDate} from '_helpers/handleDate';

export default function getAppointmentRequestModel(values) {
    const result = {};
    for (let key in values) {
        if (key === 'date') {
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
    result['create_at_date'] = formatDate(
        new Date().toLocaleDateString(),
        '',
        'm/d/y',
        true,
    );
    result['create_at_time'] =
        new Date().toLocaleTimeString('vi', {
            hour12: false,
        });
    result['status'] = 0;
    return result;
}
