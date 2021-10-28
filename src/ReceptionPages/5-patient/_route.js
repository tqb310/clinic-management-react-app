import {lazy} from 'react';
import {Sick} from '@mui/icons-material';
export default {
    id: Math.random().toString(32).substr(2,10),
    path: '/benh-nhan',
    name: 'Bệnh nhân',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Sick
};