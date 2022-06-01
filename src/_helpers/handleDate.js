import {dayLength} from '_constants/date';

export const compare2Days = (date1, date2) => {
    if (date1.getFullYear() > date2.getFullYear()) return 1;
    if (date1.getFullYear() < date2.getFullYear())
        return -1;
    //In case of date1.getFullYear === date2.getFullYear
    if (date1.getMonth() > date2.getMonth()) return 1;
    if (date1.getMonth() < date2.getMonth()) return -1;

    //In case of date1.getMonth === date2.getMonth
    if (date1.getDate() > date2.getDate()) return 1;
    if (date1.getDate() < date2.getDate()) return -1;
    return 0;
};

export function formatDate(
    date,
    time = '',
    format = 'd/m/y',
    hasNumPad = false,
) {
    if (!date) return;
    if (format === 'd/m/y') {
        let [d, m, y] = date.split('/');
        if (hasNumPad) {
            d = d.padStart(2, '0');
            m = m.padStart(2, '0');
        }
        return `${m}/${d}/${y}${time ? ' ' + time : ''}`;
    }
    let [m, d, y] = date.split('/');
    if (hasNumPad) {
        d = d.padStart(2, '0');
        m = m.padStart(2, '0');
    }
    return `${d}/${m}/${y}${time ? ' ' + time : ''}`;
}

export const getDatesInAMonth = (month, year) => {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (
                year % 400 === 0 ||
                (year % 4 === 0 && year % 100 !== 0)
            )
                return 29;
            return 28;
        default:
            return 31;
    }
};

export const toNewDate = (date, monthInc) => {
    const offset =
        1 -
        date.getDate() +
        monthInc *
            getDatesInAMonth(
                monthInc > 0
                    ? date.getMonth() + 1
                    : date.getMonth(),
                date.getFullYear(),
            );
    return new Date(date.getTime() + offset * dayLength);
};

export const getCreatedTime = (time1, time2) => {
    if (!time1 || !time2) return;
    let result = {
            text: '',
            ms: 0,
            difference: 0,
        },
        unit = ' giây';

    const difference = time2.getTime() - time1.getTime();
    result.ms = difference;
    result.difference = difference / 1000;
    if (result.difference >= 60) {
        result.difference /= 60;
        unit = ' phút';
    }
    if (result.difference >= 60) {
        result.difference /= 60;
        unit = ' giờ';
    }
    if (result.difference >= 24) {
        result.difference /= 24;
        unit = ' ngày';
    }
    if (result.difference >= 30) {
        result.difference /= 30;
        unit = ' tháng';
    }
    result.text =
        Math.floor(result.difference) + unit + ' trước';

    return result;
};
