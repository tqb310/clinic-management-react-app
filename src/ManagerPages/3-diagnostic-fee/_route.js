import {lazy} from 'react';
import {Feed} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/phi-kham',
    name: 'Phí khám',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Feed
};

export default route;