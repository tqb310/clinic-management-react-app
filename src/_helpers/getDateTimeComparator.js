import {formatDate} from './handleDate';

const getDateTimeComparator = (time1, time2) => {
    const timeMs1 = new Date(time1).getTime();
    const timeMs2 = new Date(time2).getTime();
    return timeMs1 - timeMs2;
};

export default getDateTimeComparator;
