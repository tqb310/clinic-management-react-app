export default function queryData(data, queryFunc) {
    if (data && data.length) {
        return data.filter(queryFunc);
    }
    return null;
}
