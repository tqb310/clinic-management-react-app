export default function getOrderNumber(time) {
    const [h, m] = time.split(':');
    let result = (parseInt(h) - 7) * 6;
    result += Math.floor(parseInt(m) / 10 + 1);
    return result;
}
