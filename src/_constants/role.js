// const role = {
//     manager: 'Manager',
//     receptionist: 'Receptionist',
//     doctor: 'Doctor'
// };

const role = new Map([
    [
        1,
        {
            url: '/tiep-tan',
            name: 'Receptionist',
        },
    ],
    [
        3,
        {
            url: '/quan-ly',
            name: 'Manager',
        },
    ],
    [
        2,
        {
            url: '/bac-si',
            name: 'Doctor',
        },
    ],
]);

export default role;
