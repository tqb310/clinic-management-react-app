import * as yup from 'yup';

const patientSchema = yup.object().shape({
    patient_name: yup.string().required('Chưa nhập tên!'),
    phone: yup
        .string()
        .matches(
            new RegExp(/^\d+$/),
            'Số điện thoại không hợp lệ',
        )
        .required('Chưa nhập số điện thoại!'),
    dob: yup
        .date()
        .required('Chưa nhập ngày sinh!')
        .nullable()
        .typeError('Ngày tháng không hợp lệ!'),
    gender: yup
        .mixed()
        .oneOf([0, 1])
        .required('Chưa chọn giới tính'),
    occupation: yup
        .string()
        .required('Chưa nhập nghề nghiệp'),
    identity_number: yup
        .number()
        .required('Chưa nhập CCCD!'),
    address: yup.object().shape({
        province: yup.number().required('Chưa chọn tỉnh!'),
        district: yup.number().required('Chưa chọn huyện!'),
        ward: yup.number().required('Chưa chọn xã!'),
        details: '',
    }),
    note: yup.string().notRequired(),
    height: yup
        .number()
        .positive('Vui lòng nhập số dương!')
        .required('Chưa nhập chiều cao!'),
    weight: yup
        .number()
        .positive('Vui lòng nhập số dương!')
        .required('Chưa nhập cân nặng!'),
});

export default patientSchema;
