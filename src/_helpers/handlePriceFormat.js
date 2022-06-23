export default function handlePriceFormat(price) {
    if (!price) return '';
    if (price >= 1000) {
        return (
            handlePriceFormat(Math.floor(price / 1000)) +
            ',' +
            price.toString().slice(-3)
        );
    }
    return price + '';
}
