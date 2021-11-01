// const role = {
//     manager: 'Manager',
//     receptionist: 'Receptionist',
//     doctor: 'Doctor'
// };

const role = new Map(
    [
        [
            1,
            {
                url:'/tiep-tan',
                name:'Receptionist'
            }
        ],
        [
            2,
            {
                url:'/quan-ly',
                name:'Manager'
            }
        ],
        [
            3,
            {
                url:'/bac-si',
                name:'Doctor'
            }
        ],
    ]
)
export default role;

