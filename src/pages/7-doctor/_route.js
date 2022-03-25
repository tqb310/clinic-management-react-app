import {lazy} from 'react';
// import {Vaccines} from '@mui/icons-material';
import MedicationIcon from '@mui/icons-material/Medication';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/bac-si',
    name: 'Bác sĩ',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: MedicationIcon,
};

export default route;
