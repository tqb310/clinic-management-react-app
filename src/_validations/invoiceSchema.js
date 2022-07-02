import * as yup from 'yup';

const invoiceSchema = yup.object().shape({
    heart_rate: yup
        .number()
        .moreThan(-1, 'Bạn vui lòng nhập số dương!')
        .required('Bạn chưa nhập chỉ số nhịp tim!'),
    breathing_rate: yup
        .number()
        .moreThan(-1, 'Bạn vui lòng nhập số dương!')
        .required('Bạn chưa nhập chỉ số nhịp thở!'),
    blood_pressure: yup
        .number()
        .moreThan(-1, 'Bạn vui lòng nhập số dương!')
        .required('Bạn chưa nhập chỉ số huyết áp!'),
    temperature: yup
        .number()
        .moreThan(-1, 'Bạn vui lòng nhập số dương!')
        .required('Bạn chưa nhập chỉ số nhiệt độ cơ thể!'),
    symptom: yup
        .string()
        .required('Bạn chưa nhập triệu chứng!'),
    diagnosis: yup
        .string()
        .required('Bạn chưa nhập chẩn đoán!'),
    follow_up_date: yup.date().notRequired().nullable(),
    follow_up_time: yup.object().shape({
        hour: yup.string().notRequired(),
        minute: yup.string().notRequired(),
    }),
    services: yup
        .array()
        .of(yup.number().integer().min(1).max(5))
        .min(1, 'Bạn chưa chọn dịch vụ nào!'),
    prescription: yup
        .array()
        .of(
            yup.object().shape({
                number: yup
                    .number()
                    .integer('Bạn vui lòng nhập số nguyên!')
                    .positive('Bạn vui lòng nhập số dương!')
                    .required(
                        'Bạn chưa nhập số lượng viên thuốc!',
                    ),
                name: yup
                    .string()
                    .required('Bạn chưa nhập tên thuốc'),
                dosage: yup.object().shape({
                    morning: yup.number().notRequired(),
                    noon: yup.number().notRequired(),
                    afternoon: yup.number().notRequired(),
                    evening: yup.number().notRequired(),
                }),
                advice: yup.string().notRequired(),
            }),
        )
        .min(1, 'Bạn chưa nhập đơn thuốc!'),
});

export default invoiceSchema;
