export const dateMap = new Map([
    [0, 'CN'],
    [1, 'Hai'],
    [2, 'Ba'],
    [3, 'Tư'],
    [4, 'Năm'],
    [5, 'Sáu'],
    [6, 'Bảy'],
]);


export const dayLength = 86400000;

export const dateParse = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
export let today
setTimeout(() => {
    today = Date.now()
}, 10000);

