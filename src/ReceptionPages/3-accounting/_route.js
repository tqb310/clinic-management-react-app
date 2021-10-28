import {lazy} from 'react';
import {CreditCard} from '@mui/icons-material';

export default {
    id: Math.random().toString(32).substr(2,10),
    path: '/thu-phi',
    name: 'Thu phí',
    exact: true,
    public: false,
    component: lazy(() => import('./index')),
    icon: CreditCard
};