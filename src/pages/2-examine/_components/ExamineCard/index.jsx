import React, {useState} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import {
    RadioButtonUnchecked,
    CheckCircle,
} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent';
import PatientInfo from './_components/PatientInfo';
import ServiceInfo from './_components/ServiceInfo';
import ExaminingInfo from './_components/ExaminingInfo';
import PrescriptionForm from './_components/Prescription';
import './index.scss';
// import PropTypes from 'prop-types'

function ExamineCard({selectedCard, handleSubmit}) {
    // console.log(data);
    const [open, setOpen] = useState(false);
    // const [isValidForm, setValidForm] = useState(true);
    const [prescriptionData, setPrescriptionData] =
        useState([]);
    const [examiningData, setExaminingData] = useState({});
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmitPres = data => {
        // console.log(data);
        setPrescriptionData(data);
    };
    const handleSubmitExamining = data => {
        //  console.log("FINAL: ", data);
        setExaminingData(data);
    };
    const handleSubmitComplete = () => {
        if (prescriptionData.length === 0) {
            alert('Bạn chưa kê toa thuốc');
            return;
        }
        if (Object.keys(examiningData).length === 0) {
            alert('Bạn chưa điền kết quả khám lâm sàng');
            return;
        }
        // console.log(examiningData);
        const result = {
            ...examiningData,
            PRESCRIPTION: prescriptionData,
        };
        handleSubmit(result);
    };

    return (
        <CustomPaper className="DTExamineCard">
            <div className="DTExamineCard__header">
                <Typography variant="h5" gutterBottom>
                    Phiếu khám bệnh
                </Typography>
                <p>
                    {selectedCard && (
                        <span>#{selectedCard.id}</span>
                    )}
                </p>
            </div>
            <div className="DTExamineCard__cardInfo">
                <p>
                    <span>Ngày lập</span>
                    <TextField
                        variant="filled"
                        value="13/12/2021"
                        size="small"
                        sx={{
                            '& .MuiInputBase-input': {
                                paddingTop: 0,
                            },
                            width: 150,
                        }}
                    />
                </p>
            </div>
            <div className="DTExamineCard__content">
                <div className="DTExamineCard__patientInfo">
                    <PatientInfo
                        first_name={
                            selectedCard?.first_name
                        }
                        last_name={selectedCard?.last_name}
                        dob={selectedCard?.dob}
                        phone={selectedCard?.phone}
                        identity_number={
                            selectedCard?.identity_number
                        }
                        occupation={
                            selectedCard?.occupation
                        }
                        ward={selectedCard?.ward}
                        district={selectedCard?.district}
                        province={selectedCard?.province}
                        note={selectedCard?.note}
                    />
                </div>
                <div className="DTExamineCard__service">
                    <ServiceInfo
                        data={selectedCard?.services}
                    />
                </div>
                <div className="DTExamineCard__examineInfo">
                    <ExaminingInfo
                        handleSubmit={handleSubmitExamining}
                    />
                </div>
            </div>
            <div className="DTExamineCard__footer">
                <div>
                    <Button
                        variant="outlined"
                        sx={{width: 180, marginRight: 2}}
                    >
                        Cập nhật dịch vụ
                    </Button>
                    <Button
                        variant="outlined"
                        color={
                            prescriptionData.length > 0
                                ? 'success'
                                : 'warning'
                        }
                        startIcon={
                            prescriptionData.length > 0 ? (
                                <CheckCircle />
                            ) : (
                                <RadioButtonUnchecked />
                            )
                        }
                        sx={{width: 110}}
                        onClick={() => setOpen(true)}
                    >
                        Kê toa
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        sx={{width: 110, marginRight: 2}}
                        // disabled={isValidForm}
                        onClick={handleSubmitComplete}
                    >
                        Hoàn tất
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{width: 110}}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
            <PrescriptionForm
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitPres}
            />
        </CustomPaper>
    );
}

// ExamineCard.propTypes = {};

export default ExamineCard;
