import * as yup from 'yup';
import patientSchema from './patientSchema';

const appointmentSchema = {
    patient: yup.object().shape({
        patient: patientSchema,
    }),
    appointment: yup.object().shape({
        appointment: yup.object().shape({
            date: yup
                .date()
                .required('Bạn chưa chọn ngày khám!')
                .nullable()
                .typeError('Ngày tháng không hợp lệ!'),
            time: yup
                .string()
                .required('Bạn chưa chọn khung giờ!'),
            type: yup
                .mixed()
                .oneOf([0, 1])
                .required('Bạn chưa chọn loại phiếu khám'),
        }),
    }),
    both: yup.object().shape({
        patient: patientSchema,
        appointment: yup.object().shape({
            date: yup
                .date()
                .required('Bạn chưa chọn ngày khám!')
                .nullable()
                .typeError('Ngày tháng không hợp lệ!'),
            time: yup
                .string()
                .required('Bạn chưa chọn khung giờ!'),
            type: yup
                .mixed()
                .oneOf([0, 1])
                .required('Bạn chưa chọn loại phiếu khám'),
        }),
    }),
};

export default appointmentSchema;
