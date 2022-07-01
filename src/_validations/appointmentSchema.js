import * as yup from 'yup';
import patientSchema from './patientSchema';

const appointmentSchema = yup.object().shape({
    patient: patientSchema,
    appointment: yup.object().shape({
        date: yup
            .date()
            .required('Bạn chưa chọn ngày khám!'),
        time: yup
            .string()
            .required('Bạn chưa chọn giờ khám!'),
        type: yup
            .mixed()
            .oneOf([0, 1])
            .required('Bạn chưa chọn loại phiếu khám'),
    }),
});

export default appointmentSchema;
