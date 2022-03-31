import {lazy} from 'react';
// import {Vaccines} from '@mui/icons-material';
import HourglassTop from '@mui/icons-material/HourglassTop';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/hang-doi',
    name: 'Hàng đợi',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: HourglassTop,
};

export default route;
