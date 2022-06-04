import {formatDate} from '_helpers/handleDate';

export default function getAppointmentModel(values) {
    const result = {
        time:
            values.hour && values.minute
                ? values.hour + ':' + values.minute
                : '',
        status: 1,
    };

    for (let key in values) {
        if (key === 'hour' || key === 'minute') {
            continue;
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
    return result;
}
