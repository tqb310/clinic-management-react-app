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
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

export const dayLength = 86400000;

export const dateParse = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const timeParse = dateTime => {
    return `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
}

export const dateTimeNow = () => {
    return `${dateParse(new Date())} ${timeParse(new Date())}`
}

export let today


