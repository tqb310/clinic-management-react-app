import {lazy} from 'react';
import {Dashboard} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/trang-chu',
    name: 'Trang chủ',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Dashboard
};

export default route;