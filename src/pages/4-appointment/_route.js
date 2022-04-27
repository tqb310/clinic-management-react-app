import {lazy} from 'react';
import {DateRange} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/lich-hen',
    name: 'Lịch hẹn',
    exact: true,
    isPublic: false,
    component: lazy(() => import('./index')),
    icon: DateRange,
    roles: [0, 1, 2],
};
export default route;
