import React, {useState, useEffect, memo} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {ArrowBack} from '@mui/icons-material';
import PatientInfo from 'pages/7-doctor/_components/PatientInfo';
import ExaminingInfo from './_components/ExaminingInfo';
import ServiceInfo from './_components/ServiceInfo';
import PrescriptionInfo from './_components/PrescriptionInfo';
import DiagnosticService from '_services/diagnostic.service';
// import { rows } from "_constants/FakeData/ExamineList.js";
import TabTableWrapper from '_components/shared/TabTableWrapper';
import './index.scss';

const tab = [
    {title: 'Thông tin bệnh nhân'},
    {title: 'Thông tin khám bệnh'},
    {title: 'Dịch vụ'},
    {title: 'Toa thuốc'},
];

const componentArr = [
    PatientInfo,
    ExaminingInfo,
    ServiceInfo,
    PrescriptionInfo,
];

function DetailCard() {
    const {id} = useParams();
    const history = useHistory();
    const [data, setData] = useState({});
    //   const data = rows.find((row) => row.id === id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataApi =
                    await DiagnosticService.getDiagnosticById(
                        id,
                    );
                console.log(dataApi);
                switch (dataApi) {
                    case null:
                        alert(
                            'Lỗi server, vui lòng thử lại',
                        );
                        break;
                    case undefined:
                        alert(
                            'Bạn không có quyền truy cập vào tính năng này!',
                        );
                        break;
                    default:
                        setData(dataApi);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="DetailCard">
            <div className="DetailCard__title">
                <CustomPaper
                    className="DetailCard__titleBack"
                    onClick={() =>
                        history.push(
                            history.location.pathname
                                .split('/')
                                .slice(0, 3)
                                .join('/'),
                        )
                    }
                >
                    <ArrowBack className="icon" />
                </CustomPaper>
                <CustomPaper className="DetailCard__titleWord">
                    Chi tiết phiếu khám
                </CustomPaper>
            </div>
            <CustomPaper className="DetailCard__content">
                <div className="DetailCard__cardInfo">
                    <p>
                        <span>Mã phiếu</span>
                        <TextField
                            variant="filled"
                            value={id}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 175,
                            }}
                        />
                    </p>
                    <p>
                        <span>Ngày lập</span>
                        <TextField
                            variant="filled"
                            value={new Date(
                                data.CREATE_AT,
                            ).toLocaleDateString()}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 150,
                            }}
                        />
                    </p>
                    <p>
                        <span>Tiếp nhận</span>
                        <TextField
                            variant="filled"
                            value="Đặng Ngọc Liêm"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 200,
                            }}
                        />
                    </p>
                    <p>
                        <span>Bác sĩ</span>
                        <TextField
                            variant="filled"
                            value="Đặng Ngọc Liêm"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 200,
                            }}
                        />
                    </p>
                    <p>
                        <span>Loại</span>
                        <Button>Tái khám - vdf1515</Button>
                    </p>
                    <p style={{flex: 1}}>
                        <span>Ngày tái khám</span>
                        <TextField
                            variant="filled"
                            value="31/12/2021"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 200,
                            }}
                        />
                    </p>
                </div>
                <TabTableWrapper
                    tabNameArr={tab}
                    style={{
                        marginTop: 15,
                        marginRight: 0,
                        height: '61%',
                    }}
                >
                    {id => {
                        const Component = componentArr[id];
                        return (
                            <div
                                style={{
                                    padding: '1rem',
                                    height: '100%',
                                }}
                            >
                                <Component data1={data} />
                            </div>
                        );
                    }}
                </TabTableWrapper>
            </CustomPaper>
        </div>
    );
}

export default memo(DetailCard);
