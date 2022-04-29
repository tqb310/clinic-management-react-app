import {dayLength} from '_constants/date';

export const compare2Days = (date1, date2) => {
    // const difference = date1.getTime() - date2.getTime();
    // if(difference > 0)
    //   return 1;
    // if(difference < 0)
    //   return -1;
    // return 0;
    if (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
        return true;
    return false;
};

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
