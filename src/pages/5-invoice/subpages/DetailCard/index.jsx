import React, {useEffect, memo, lazy} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {TextField, Button, Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {ArrowBack} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPaidInvoiceAsync} from '_redux/slice/invoiceSlice';
// import { rows } from "_constants/FakeData/ExamineList.js";
import TabTableWrapper from '_components/shared/TabTableWrapper';
import './index.scss';

const tab = [
    {title: 'Thông tin bệnh nhân'},
    {title: 'Thông tin khám bệnh'},
    {title: 'Dịch vụ'},
    {title: 'Toa thuốc'},
];

const PatientInfoComp = lazy(() =>
    import(
        'pages/2-examine/_components/ExamineCard/_components/PatientInfo'
    ),
);
const ExaminingInfoComp = lazy(() =>
    import('./_components/ExaminingInfo'),
);
const ServiceInfoComp = lazy(() =>
    import('./_components/ServiceInfo'),
);
const PrescriptionInfoComp = lazy(() =>
    import('./_components/PrescriptionInfo'),
);

function DetailCard() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const data =
        useSelector(
            state => state.invoices.selectedPaidInvoice,
        ) || {};

    useEffect(() => {
        dispatch(setSelectedPaidInvoiceAsync(id));
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
                <Box className="DetailCard__cardInfo">
                    <Box>
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
                    </Box>
                    <Box>
                        <span>Ngày lập</span>
                        <TextField
                            variant="filled"
                            value={data.create_at || ''}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 150,
                            }}
                        />
                    </Box>
                    <Box>
                        <span>Loại</span>
                        <Button>
                            {data.type
                                ? 'Tái khám'
                                : 'Khám mới'}
                        </Button>
                    </Box>
                    <Box sx={{flex: 1}}>
                        <span>Ngày tái khám</span>
                        <TextField
                            variant="filled"
                            value={
                                data.follow_up_date
                                    ? data.follow_up_date +
                                      ' - ' +
                                      data.follow_up_time
                                    : ''
                            }
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                width: 200,
                            }}
                        />
                    </Box>
                </Box>
                <TabTableWrapper
                    tabNameArr={tab}
                    style={{
                        marginTop: 15,
                        marginRight: 0,
                    }}
                >
                    <Box>
                        <PatientInfoComp {...data} />
                    </Box>
                    <Box>
                        <ExaminingInfoComp data={data} />
                    </Box>
                    <Box>
                        <ServiceInfoComp data={data} />
                    </Box>
                    <Box>
                        <PrescriptionInfoComp data={data} />
                    </Box>
                </TabTableWrapper>
            </CustomPaper>
        </div>
    );
}

export default memo(DetailCard);
