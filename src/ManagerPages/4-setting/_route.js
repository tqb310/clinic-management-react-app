import {lazy} from 'react';
import {Settings} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/cai-dat',
    name: 'Cài đặt',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Settings
};

export default route;