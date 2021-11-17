import {lazy} from 'react';
import {CreditCard} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/thu-phi',
    name: 'Phiếu khám',
    exact: true,
    public: false,
    component: lazy(() => import('./index')),
    icon: CreditCard
}

export default route;