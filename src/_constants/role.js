// const role = {
//     manager: 'Manager',
//     receptionist: 'Receptionist',
//     doctor: 'Doctor'
// };

const role = new Map([
    [
        0,
        {
            url: '/tiep-tan',
            name: 'Receptionist',
        },
    ],
    [
        2,
        {
            url: '/quan-ly',
            name: 'Manager',
        },
    ],
    [
        1,
        {
            url: '/bac-si',
            name: 'Doctor',
        },
    ],
]);
export default role;
