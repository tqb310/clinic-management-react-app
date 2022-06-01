const initialValue = {
    patient: {
        patient_name: '',
        phone: '',
        dob: null,
        gender: 0,
        occupation: '',
        identity_number: '',
        address: {
            province: '',
            district: '',
            ward: '',
            details: '',
        },
        note: '',
        height: '',
        weight: '',
    },
    invoice: {
        services: [1],
        type: 0,
    },
};

export default initialValue;
