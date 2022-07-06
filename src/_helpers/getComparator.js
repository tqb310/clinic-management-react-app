const ascendingSort = (itemA, itemB, orderBy) => {
    if (itemA[orderBy] > itemB[orderBy]) return 1;
    if (itemA[orderBy] < itemB[orderBy]) return -1;
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'asc'
        ? (a, b) => ascendingSort(a, b, orderBy)
        : (a, b) => -ascendingSort(a, b, orderBy);
};

export default getComparator;
