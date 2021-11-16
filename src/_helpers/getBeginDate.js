import {dayLength} from "_constants/date"

export default function getBeginDate(){
    const offset = new Date(Date.now()).getDay() - 1;
    return new Date(Date.now() - offset * dayLength);
}