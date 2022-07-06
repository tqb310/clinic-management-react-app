import * as yup from 'yup';
import patientSchema from './patientSchema';

const queueSchema = yup.object().shape({
    patient: patientSchema,
    invoice: yup.object().shape({
        services: yup
            .array()
            .of(yup.number().integer().min(1).max(5))
            .min(1, 'Bạn chưa chọn dịch vụ nào!'),
        type: yup
            .mixed()
            .oneOf([0, 1])
            .required('Bạn chưa chọn loại phiếu khám'),
    }),
});

export default queueSchema;
