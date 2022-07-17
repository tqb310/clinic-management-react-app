import * as yup from 'yup';

const invoiceSchema = yup.object().shape(
    {
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
            .required(
                'Bạn chưa nhập chỉ số nhiệt độ cơ thể!',
            ),
        symptom: yup
            .string()
            .required('Bạn chưa nhập triệu chứng!'),
        diagnosis: yup
            .string()
            .required('Bạn chưa nhập chẩn đoán!'),
        follow_up_date: yup
            .date()
            .nullable()
            .typeError('Ngày tháng không hợp lệ!')
            .when(
                [
                    'follow_up_time.hour',
                    'follow_up_time.minute',
                ],
                {
                    is: (hour, minute) => {
                        return hour && minute;
                    },
                    then: yup
                        .date()
                        .required(
                            'Bạn chưa nhập ngày tái khám!',
                        ),
                    otherwise: yup.date().notRequired(),
                },
            ),
        follow_up_time: yup.object().shape(
            {
                hour: yup.mixed().when(['minute'], {
                    is: minute => minute,
                    then: yup
                        .string()
                        .required('Bạn chưa nhập giờ!'),
                    otherwise: yup.string().notRequired(),
                }),
                minute: yup.mixed().when(['hour'], {
                    is: hour => hour,
                    then: yup
                        .string()
                        .required('Bạn chưa nhập phút!'),
                    otherwise: yup.string().notRequired(),
                }),
            },
            ['hour', 'minute', 'follow_up_date'],
        ),
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
                        .integer(
                            'Bạn vui lòng nhập số nguyên!',
                        )
                        .positive(
                            'Bạn vui lòng nhập số dương!',
                        )
                        .required(
                            'Bạn chưa nhập số lượng viên thuốc!',
                        ),
                    name: yup
                        .string()
                        .required(
                            'Bạn chưa nhập tên thuốc',
                        ),
                    dosage: yup.object().shape({
                        morning: yup.number().notRequired(),
                        noon: yup.number().notRequired(),
                        afternoon: yup
                            .number()
                            .notRequired(),
                        evening: yup.number().notRequired(),
                    }),
                    advice: yup.string().notRequired(),
                }),
            )
            .min(1, 'Bạn chưa nhập đơn thuốc!'),
    },
    [
        'follow_up_time.hour',
        'follow_up_time.minute',
        'follow_up_date',
    ],
);

export default invoiceSchema;
