import {lazy} from 'react';
import {CreditCard} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/phieu-kham',
    name: 'Phiếu khám',
    exact: false,
    public: false,
    component: lazy(() => import('./index')),
    icon: CreditCard
}

export default route;