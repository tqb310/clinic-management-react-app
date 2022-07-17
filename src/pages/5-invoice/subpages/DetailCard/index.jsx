import React, {
    useEffect,
    memo,
    lazy,
    useState,
} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControlLabel,
    Switch,
    Alert,
    Snackbar,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {ArrowBack} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPaidInvoiceAsync} from '_redux/slice/invoiceSlice';
import TabTableWrapper from '_components/shared/TabTableWrapper';
import {styled} from '@mui/material/styles';
import './index.scss';

const tab = [
    {title: 'Bệnh nhân'},
    {title: 'Khám bệnh'},
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
    padding: 1.5rem 0;
`;

function DetailCard() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isEditable, setEditable] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
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
                <CustomPaper className="DetailCard__title-switch">
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={isEditable}
                                onChange={e =>
                                    setEditable(
                                        e.target.checked,
                                    )
                                }
                            />
                        }
                        label="Chỉnh sửa"
                        sx={{
                            '.MuiTypography-root': {
                                fontSize: 14.4,
                            },
                        }}
                    />
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
                        flexWrap: {
                            xs: 'wrap',
                            md: 'nowrap',
                        },
                    }}
                >
                    <Box sx={{px: '6px', width: '100%'}}>
                        <Typography variant="body1">
                            Mã phiếu
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={id}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 1,
                                    fontSize: '1.6rem',
                                },
                                mt: '4px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px', width: '100%'}}>
                        <Typography variant="body1">
                            Ngày lập
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={data.create_at || ''}
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 1,
                                    fontSize: '1.6rem',
                                },
                                mt: '4px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px', width: '100%'}}>
                        <Typography variant="body1">
                            Loại
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                data.type
                                    ? 'Tái khám'
                                    : 'Khám mới'
                            }
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 1,
                                    fontSize: '1.6rem',
                                },
                                mt: '4px',
                            }}
                        />
                    </Box>
                    <Box sx={{px: '6px', width: '100%'}}>
                        <Typography variant="body1">
                            Ngày tái khám
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                data.follow_up_date &&
                                data.follow_up_time
                                    ? data.follow_up_date +
                                      ' - ' +
                                      data.follow_up_time
                                    : 'Không có'
                            }
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    paddingTop: 1,
                                    fontSize: '1.6rem',
                                },
                                mt: '4px',
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
                    minHeight: '365px',
                }}
            >
                <TabItemContainer>
                    <PatientInfoComp
                        {...data}
                        gender={data.gender ? 'Nam' : 'Nữ'}
                        isEditable={isEditable}
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
            <CustomPaper
                sx={{
                    py: 2,
                    px: 3,
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'sticky',
                    bottom: '10px',
                }}
            >
                <Button
                    variant="outlined"
                    sx={{mr: 6, px: 4}}
                    disabled={!isEditable}
                    onClick={setOpen.bind(null, true)}
                >
                    Lưu
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{px: 4}}
                    disabled={!isEditable}
                >
                    Hủy
                </Button>
            </CustomPaper>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity="info"
                    sx={{width: '100%'}}
                >
                    TÍNH NĂNG ĐANG PHÁT TRIỂN
                </Alert>
            </Snackbar>
        </div>
    );
}

export default memo(DetailCard);
