import {lazy} from 'react';
import {Accessible} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/benh-nhan',
    name: 'Bệnh nhân',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Accessible,
    roles: [1, 2, 3],
};
export default route;
