import {lazy} from 'react';
import {HourglassTop} from '@mui/icons-material';

export default {
    id: Math.random().toString(32).substr(2,10),
    path: '/hang-doi',
    name: 'Hàng đợi',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: HourglassTop
};