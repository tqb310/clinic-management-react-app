import React, {useState} from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    TextField,
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    Box,
} from '@mui/material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    Select,
    DatePickerField,
    TextArea,
} from '_components/shared/FormikField';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Close,
} from '@mui/icons-material';
import {gender, cardType} from '_constants/general';
import {useLocation} from '_contexts/LocationContext';
import getInitialDataFormat from '_helpers/getInitialDataFormat';
import {formatDate} from '_helpers/handleDate';
import {
    hourSelect,
    minuteSelect,
    handleMinute,
} from '_constants/date';
// import handlePriceFormat from "_helpers/handlePriceFormat.js";
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

function ConfirmRequest({
    title,
    open,
    handleClose,
    data,
    handleSubmit,
}) {
    const [switchEdit, setSwitchEdit] = useState(false);
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    return (
        <Dialog
            modal={true}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    position: 'relative',
                    padding: '.8rem 1.5rem .8rem 1.5rem',
                    fontSize: '15px',
                    fontWeight: 600,
                }}
            >
                {title}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 3,
                        right: 15,
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <Formik
                enableReinitialize
                initialValues={{
                    ...getInitialDataFormat(data),
                    DATE: formatDate(data?.date),
                    HOUR: data?.time.split(':')[0],
                    MINUTE: handleMinute(
                        data?.time.split(':')[1],
                    ),
                    STATUS: data?.status,
                }}
                onSubmit={handleSubmit}
                onChange={() => {
                    console.log(
                        'All Form State is changed',
                    );
                }}
            >
                {form => {
                    // console.log(form);
                    return (
                        <Form>
                            <DialogContent
                                dividers
                                // className="ConfirmRequest"
                                sx={{
                                    boxSizing: 'border-box',
                                    width: 600,
                                }}
                            >
                                <Grid
                                    container
                                    mt={2}
                                    columnSpacing={2}
                                    className="add-form__form-content"
                                >
                                    <Grid item xs={5}>
                                        <FastField
                                            name="PATIENT_NAME"
                                            id="PATIENT_NAME"
                                            component={
                                                Input
                                            }
                                            label="Tên bệnh nhân"
                                            required
                                            icon={Person}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="PATIENT_PHONE"
                                            id="PATIENT_PHONE"
                                            component={
                                                Input
                                            }
                                            label="Số điện thoại"
                                            required
                                            icon={
                                                PhoneEnabled
                                            }
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="IDENTITY_NUMBER"
                                            id="IDENTITY_NUMBER"
                                            component={
                                                Input
                                            }
                                            label="CCCD"
                                            icon={
                                                BrandingWatermark
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FastField
                                            name="OCCUPATION"
                                            id="OCCUPATION"
                                            component={
                                                Input
                                            }
                                            label="Nghề nghiệp"
                                            icon={Work}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="DATE_OF_BIRTH"
                                            id="DATE_OF_BIRTH"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ngày sinh"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="PATIENT_GENDER"
                                            id="PATIENT_GENDER"
                                            component={
                                                Select
                                            }
                                            label="Giới tính"
                                            items={gender}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="HEIGHT"
                                            id="HEIGHT"
                                            component={
                                                Input
                                            }
                                            label="Chiều cao"
                                            icon="cm"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="WEIGHT"
                                            id="WEIGHT"
                                            component={
                                                Input
                                            }
                                            label="Cân nặng"
                                            icon="kg"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="PATIENT_TYPE"
                                            id="PATIENT_TYPE"
                                            component={
                                                Select
                                            }
                                            label="Loại"
                                            items={cardType}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="DATE"
                                            id="DATE"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ngày hẹn"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="HOUR"
                                            id="HOUR"
                                            component={
                                                Select
                                            }
                                            label="Giờ"
                                            items={
                                                hourSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="MINUTE"
                                            id="MINUTE"
                                            component={
                                                Select
                                            }
                                            label="Phút"
                                            items={
                                                minuteSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="STATUS"
                                            id="STATUS"
                                            component={
                                                Input
                                            }
                                            label="Trạng thái"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display:
                                                    'flex',
                                                justifyContent:
                                                    'space-between',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="#888"
                                                gutterBottom
                                                ml={1}
                                            >
                                                Địa chỉ
                                            </Typography>

                                            <FormControlLabel
                                                sx={{
                                                    mr: 0,
                                                    mb: 1,
                                                }}
                                                label="Chỉnh sửa"
                                                control={
                                                    <Switch
                                                        size="small"
                                                        checked={
                                                            switchEdit
                                                        }
                                                        onChange={e =>
                                                            setSwitchEdit(
                                                                e
                                                                    .target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                    {switchEdit ? (
                                        <>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="ADDRESS.province"
                                                    id="ADDRESS.province"
                                                    component={
                                                        Select
                                                    }
                                                    label="Tỉnh/ thành phố"
                                                    items={
                                                        provinces
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="ADDRESS.district"
                                                    id="ADDRESS.district"
                                                    component={
                                                        Select
                                                    }
                                                    label="Huyện/ quận"
                                                    items={
                                                        districts
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="ADDRESS.ward"
                                                    id="ADDRESS.ward"
                                                    component={
                                                        Select
                                                    }
                                                    label="Xã/ phường"
                                                    items={
                                                        wards
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <FastField
                                                    name="ADDRESS.detail"
                                                    id="ADDRESS.detail"
                                                    component={
                                                        TextArea
                                                    }
                                                    label="Số nhà, tên đường ..."
                                                    rows={2}
                                                    icon={
                                                        Home
                                                    }
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item xs={12}>
                                            {' '}
                                            <TextField
                                                sx={{
                                                    mb: 2,
                                                }}
                                                fullWidth
                                                size="small"
                                                value={
                                                    data.district +
                                                    ' - ' +
                                                    data.province
                                                }
                                                multiline
                                                rows={3}
                                                inputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <FastField
                                            name="NOTE"
                                            id="NOTE"
                                            component={
                                                TextArea
                                            }
                                            label="Ghi chú"
                                            rows={3}
                                            maxRow={3}
                                            icon={Edit}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="button"
                                    onClick={
                                        form.handleReset
                                    }
                                    color="secondary"
                                    sx={{mr: 2}}
                                >
                                    TÁI THIẾT
                                </Button>
                                <Button
                                    onClick={
                                        form.submitForm
                                    }
                                >
                                    SỬA
                                </Button>
                            </DialogActions>
                        </Form>
                    );
                }}
            </Formik>
            {/* <ToastContainer />s */}
        </Dialog>
    );
}

export default ConfirmRequest;
