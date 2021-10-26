import {lazy} from 'react';

export default {
    path: '/trang-chu',
    name: 'Trang chủ',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
};