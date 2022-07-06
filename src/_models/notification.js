import {formatDate} from '_helpers/handleDate';

export default function getNotificationModel(invoice_id) {
    return {
        create_at_date: formatDate(
            new Date().toLocaleDateString(),
            '',
            'm/d/y',
            true,
        ),
        create_at_time: new Date().toLocaleTimeString(
            'vn',
            {hour12: false},
        ),
        invoice_id,
        is_read: false,
        type: 'payment',
    };
}
