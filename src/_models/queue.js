import {formatDate} from '_helpers/handleDate';

export default function getQueueModel(values) {
    return {
        date: formatDate(
            new Date().toLocaleDateString(),
            '',
            'm/d/y',
        ),
        time: new Date().toLocaleTimeString('vi', {
            hour12: false,
        }),
        status: 1,
    };
}
