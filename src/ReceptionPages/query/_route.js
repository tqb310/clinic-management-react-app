import {lazy} from 'react';

export default {
    path: '/hang-doi',
    name: 'Hàng đợi',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
};