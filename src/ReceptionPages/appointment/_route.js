import {lazy} from 'react';

export default {
    path: '/lich-hen',
    name: 'Lịch hẹn',
    exact: true,
    public: false,
    component: lazy(() => import('./index')),
};