import {lazy} from 'react';
// import {Vaccines} from '@mui/icons-material';
import MedicationIcon from '@mui/icons-material/Medication';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/kham-benh',
    name: 'Khám bệnh',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: MedicationIcon,
    roles: [1, 2],
};

export default route;
