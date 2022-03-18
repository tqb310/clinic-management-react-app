import {lazy} from 'react';
import {Dashboard} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/bac-si',
    name: 'Bác sĩ',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Dashboard
};

export default route;