import getComparator from '_helpers/getComparator';

export const initState = {
    page: 0,
    data: [],
    orderBy: '',
    order: 'asc',
    filterdProperty: '',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
            };
        case 'RESET_TABLE':
            return {
                ...state,
                page: 0,
                data: action.payload,
                orderBy: '',
                order: 'asc',
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
    payload: data,
});

export const resetTableAction = data => ({
    type: 'RESET_TABLE',
    payload: data,
});

export const nextPageAction = () => ({
    type: 'NEXT_PAGE',
});

export const backPageAction = () => ({
    type: 'BACK_PAGE',
});

export const sortAction = data => ({
    type: 'SORT',
    payload: data,
});

export const setFilteredPropertyAction = data => ({
    type: 'SET_FILTERED_PROPERTY',
    payload: data,
});
