import {lazy} from 'react';
import {CreditCard} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/phieu-kham',
    name: 'Phiếu khám & Thanh toán',
    exact: false,
    isPublic: false,
    component: lazy(() => import('./index')),
    icon: CreditCard,
    roles: [0, 1, 2],
};

export default route;
