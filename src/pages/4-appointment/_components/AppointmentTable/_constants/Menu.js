import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {openAppointmentDetail} from '_redux/slice/appointmentSlice';
import queueService from '_services/firebase/queue.service';
import appointmentService from '_services/firebase/appointment.service';
const menu = [
    {
        id: 0,
        label: 'Xem & chỉnh sửa',
        icon: EditIcon,
        style: {fontSize: '2rem'},
        onClick: (dispatch, closeMenu) => e => {
            closeMenu();
            dispatch(openAppointmentDetail(true));
        },
    },
    {
        id: 1,
        label: 'Đưa vào hàng đợi',
        icon: AddCircleIcon,
        style: {fontSize: '2rem'},
        onClick:
            (_, closeMenu, payload, actions) => async e => {
                try {
                    closeMenu();
                    await queueService.addToQueueWithAppointment(
                        {
                            patientId: payload.patient_id,
                            appointmentId:
                                payload.appointment_id,
                            type: payload.type,
                        },
                    );
                    actions.openToast({
                        isOpen: true,
                        msg: 'Đưa vào hàng đợi thành công',
                    });
                } catch (err) {
                    console.log(err);
                }
            },
    },
    {
        id: 2,
        label: 'Hủy',
        icon: DeleteForeverIcon,
        style: {
            color: 'error.main',
            fontSize: '2rem',
        },
        onClick:
            (_, closeMenu, payload, actions) => async e => {
                try {
                    closeMenu();
                    actions.openAlertDialog(true);
                } catch (err) {
                    console.log(err);
                }
            },
    },
];
export default menu;
