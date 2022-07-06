import {formatDate} from '_helpers/handleDate';

export default function getInvoiceModel(values) {
    const result = {};
    for (let key in values) {
        result[key] = values[key];
    }
    result.create_at = formatDate(
        new Date().toLocaleDateString(),
        '',
        'm/d/y',
        true,
    );
    result.status = 0;
    return result;
}
