import {lazy} from 'react';

export default {
    path: '/thu-phi',
    name: 'Thu phí',
    exact: true,
    public: false,
    component: lazy(() => import('./index')),
};