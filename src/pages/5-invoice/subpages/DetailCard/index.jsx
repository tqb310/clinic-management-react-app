import React, {useEffect, memo, lazy} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {ArrowBack} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPaidInvoiceAsync} from '_redux/slice/invoiceSlice';
import TabTableWrapper from '_components/shared/TabTableWrapper';
import {styled} from '@mui/material/styles';
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

const TabItemContainer = styled(Box)`
    padding: 1rem 0;
`;

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
                <Typography variant="h6">
                    Thông tin phiếu khám
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        mx: '-6px',
                        mt: 2,
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{px: '6px'}}>
                        <span>Mã phiếu</span>
                        <TextField
                            variant="filled"
                            value={id}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                ml: '7px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px'}}>
                        <span>Ngày lập</span>
                        <TextField
                            variant="filled"
                            value={data.create_at || ''}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                ml: '7px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px'}}>
                        <span>Loại</span>
                        <TextField
                            variant="filled"
                            value={
                                data.type
                                    ? 'Tái khám'
                                    : 'Khám mới'
                            }
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 0,
                                },
                                ml: '7px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px'}}>
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
                                ml: '7px',
                            }}
                        />
                    </Box>
                </Box>
            </CustomPaper>
            <TabTableWrapper
                tabNameArr={tab}
                style={{
                    marginTop: 15,
                    marginRight: 0,
                }}
            >
                <TabItemContainer>
                    <PatientInfoComp
                        {...data}
                        gender={data.gender ? 'Nam' : 'Nữ'}
                    />
                </TabItemContainer>
                <TabItemContainer>
                    <ExaminingInfoComp data={data} />
                </TabItemContainer>
                <TabItemContainer>
                    <ServiceInfoComp data={data} />
                </TabItemContainer>
                <TabItemContainer>
                    <PrescriptionInfoComp data={data} />
                </TabItemContainer>
            </TabTableWrapper>
        </div>
    );
}

export default memo(DetailCard);
