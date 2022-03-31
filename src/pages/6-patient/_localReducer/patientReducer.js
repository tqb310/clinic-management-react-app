import {tableData} from '../_constants/FakeTableData';

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

export const initState = {
    rowsPerPage: 8,
    page: 0,
    data: [...tableData],
    selected: [],
    orderBy: '',
    order: 'asc',
    filterdProperty: '',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: [...action.payload],
            };
        case 'RESET_TABLE':
            return {
                ...state,
                page: 0,
                data: [...action.payload],
                selected: [],
                orderBy: '',
                order: 'asc',
                anchor: null,
            };
        case 'SELECT':
            return {
                ...state,
                selected: [...action.payload],
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                page: state.page + 1,
            };
        case 'BACK_PAGE':
            return {
                ...state,
                page: state.page - 1,
            };
        case 'DELETE':
            return {
                ...state,
                selected: [],
                data: [...action.payload],
            };
        case 'SORT':
            const newOrder =
                state.orderBy === action.payload &&
                state.order === 'asc'
                    ? 'desc'
                    : 'asc';
            return {
                ...state,
                order: newOrder,
                orderBy: action.payload,
                data: [...state.data].sort(
                    getComparator(newOrder, action.payload),
                ),
            };
        case 'SET_FILTERED_PROPERTY':
            return {
                ...state,
                filterdProperty: action.payload,
            };
        default:
            return {};
    }
};

export const setDataAction = data => ({
    type: 'SET_DATA',
    payload: [...data],
});

export const resetTableAction = data => ({
    type: 'RESET_TABLE',
    payload: [...data],
});

export const selectAction = data => ({
    type: 'SELECT',
    payload: [].concat(data),
});

export const nextPageAction = () => ({
    type: 'NEXT_PAGE',
});

export const backPageAction = () => ({
    type: 'BACK_PAGE',
});

export const deleteAction = data => ({
    type: 'DELETE',
    payload: [...data],
});

export const sortAction = data => ({
    type: 'SORT',
    payload: data,
});

export const setFilteredPropertyAction = data => ({
    type: 'SET_FILTERED_PROPERTY',
    payload: data,
});
