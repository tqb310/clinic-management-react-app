import {lazy} from 'react';

export default {
    path: '/benh-nhan',
    name: 'Bệnh nhân',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
};