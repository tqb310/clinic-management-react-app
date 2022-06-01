export const dateMap = new Map([
    [0, 'CN'],
    [1, 'Hai'],
    [2, 'Ba'],
    [3, 'Tư'],
    [4, 'Năm'],
    [5, 'Sáu'],
    [6, 'Bảy'],
]);

export const hours = [
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
];

export const hourSelect = [
    {id: 1, key: '7', value: '7'},
    {id: 2, key: '8', value: '8'},
    {id: 3, key: '9', value: '9'},
    {id: 4, key: '10', value: '10'},
    {id: 5, key: '11', value: '11'},
    {id: 6, key: '12', value: '12'},
    {id: 7, key: '13', value: '13'},
    {id: 8, key: '14', value: '14'},
    {id: 9, key: '15', value: '15'},
    {id: 10, key: '16', value: '16'},
    {id: 12, key: '17', value: '17'},
    {id: 13, key: '18', value: '18'},
];

export const minuteSelect = [
    {id: 1, key: '00', value: '00'},
    {id: 2, key: '10', value: '10'},
    {id: 3, key: '20', value: '20'},
    {id: 4, key: '30', value: '30'},
    {id: 5, key: '40', value: '40'},
    {id: 6, key: '50', value: '50'},
];

export const handleMinute = minute => {
    const minuteNumber = parseInt(minute);
    if (minuteNumber < 10) return '00';
    if (minuteNumber < 20) return '10';
    if (minuteNumber < 30) return '20';
    if (minuteNumber < 40) return '30';
    if (minuteNumber < 50) return '40';
    if (minuteNumber < 60) return '50';
    return '00';
};
export const dayLength = 86400000;

export const dateParse = date => {
    return `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`;
};

export const timeParse = dateTime => {
    return `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
};

export const dateTimeNow = () => {
    return `${dateParse(new Date())} ${timeParse(
        new Date(),
    )}`;
};

export let today;
