import React, {useState, memo} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import {FieldArray, Field} from 'formik';
import {Close, Clear} from '@mui/icons-material';
import Input from '_components/shared/FormikField/Input';
import './index.scss';

// const handleDoseString = (label, data) => {
//     return data ? `${label}: ${data} viên` : '';
// };

const PrescriptionItem = ({
    id,
    value,
    handleRemove,
    setIndexPres,
}) => {
    const onRemove = id => e => {
        handleRemove(id);
        setIndexPres(pre => pre - 1);
    };
    return (
        <div className="PrescriptionItem">
            <div className="PrescriptionItem__orderNum">
                #{(id + 1).toString().padStart(2, '0')}
            </div>
            <div className="PrescriptionItem__info">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="PrescriptionItem__name">
                        {value?.name || ''}
                    </div>
                    <div className="PrescriptionItem__number">
                        <span style={{fontWeight: '500'}}>
                            Số lượng:
                        </span>{' '}
                        {value?.number || 0} viên
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '.5rem',
                    }}
                >
                    <div>
                        <span>Sáng: </span>
                        <span>
                            {value?.dosage?.morning || 0}
                        </span>
                    </div>
                    <div style={{marginLeft: '1rem'}}>
                        <span>Trưa: </span>
                        <span>
                            {value?.dosage?.noon || 0}
                        </span>
                    </div>
                    <div style={{marginLeft: '1rem'}}>
                        <span>Chiều: </span>
                        <span>
                            {value?.dosage?.afternoon || 0}
                        </span>
                    </div>
                    <div style={{marginLeft: '1rem'}}>
                        <span>Tối: </span>
                        <span>
                            {value?.dosage?.evening || 0}
                        </span>
                    </div>
                </div>
                <div className="PrescriptionItem__instruction">
                    {value?.advice || ''}
                </div>
            </div>
            <div className="PrescriptionItem__action">
                <IconButton
                    sx={{
                        opacity: 0.5,
                        '&:hover': {opacity: 0.9},
                    }}
                    onClick={onRemove(id)}
                >
                    <Clear />
                </IconButton>
            </div>
        </div>
    );
};

function PrescriptionForm({open, handleClose}) {
    const [indexPres, setIndexPres] = useState(-1);

    const handleAddPres = arrayHelpers => _ => {
        setIndexPres(indexPres + 1);
        arrayHelpers.push({
            number: '',
            name: '',
            dosage: {
                morning: '',
                noon: '',
                afternoon: '',
                evening: '',
            },
            advice: '',
        });
    };

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
                Kê toa thuốc
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
            <DialogContent
                dividers
                sx={{boxSizing: 'border-box', width: 600}}
            >
                <FieldArray
                    name="prescription"
                    render={arrayHelpers => {
                        return (
                            <div>
                                <Grid
                                    container
                                    columnSpacing={2}
                                    className="PrescriptionForm"
                                >
                                    <Grid item xs={7}>
                                        <Field
                                            id={`prescription.${indexPres}.name`}
                                            name={`prescription.${indexPres}.name`}
                                            label="Tên thuốc"
                                            component={
                                                Input
                                            }
                                            left="-5%"
                                            variant="filled"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Field
                                            id={`prescription.${indexPres}.number`}
                                            name={`prescription.${indexPres}.number`}
                                            label="Số lượng"
                                            component={
                                                Input
                                            }
                                            type="number"
                                            variant="outlined"
                                            left="-12px"
                                            required
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        style={{
                                            transform:
                                                'translateY(10px)',
                                            textAlign:
                                                'right',
                                        }}
                                    >
                                        Viên
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            display: 'flex',
                                            justifyContent:
                                                'space-between',
                                        }}
                                    >
                                        <span
                                            style={{
                                                flexShrink: 0,
                                                transform:
                                                    'translateY(10px)',
                                            }}
                                        >
                                            Liều dùng
                                        </span>
                                        <div
                                            style={{
                                                display:
                                                    'flex',
                                                padding:
                                                    '0 1rem',
                                            }}
                                        >
                                            <Field
                                                id={`prescription.${indexPres}.dosage.morning`}
                                                name={`prescription.${indexPres}.dosage.morning`}
                                                label="Sáng"
                                                component={
                                                    Input
                                                }
                                                type="number"
                                                variant="outlined"
                                                left="-12px"
                                                required
                                            />
                                            <span
                                                style={{
                                                    transform:
                                                        'translate(5px,10px)',
                                                }}
                                            >
                                                Viên
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display:
                                                    'flex',
                                                padding:
                                                    '0 1rem',
                                            }}
                                        >
                                            <Field
                                                id={`prescription.${indexPres}.dosage.noon`}
                                                name={`prescription.${indexPres}.dosage.noon`}
                                                label="Trưa"
                                                component={
                                                    Input
                                                }
                                                type="number"
                                                variant="outlined"
                                                left="-12px"
                                                required
                                            />
                                            <span
                                                style={{
                                                    transform:
                                                        'translate(5px, 10px)',
                                                }}
                                            >
                                                Viên
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display:
                                                    'flex',
                                                padding:
                                                    '0 1rem',
                                            }}
                                        >
                                            <Field
                                                id={`prescription.${indexPres}.dosage.afternoon`}
                                                name={`prescription.${indexPres}.dosage.afternoon`}
                                                label="Chiều"
                                                component={
                                                    Input
                                                }
                                                type="number"
                                                variant="outlined"
                                                left="-12px"
                                                required
                                            />
                                            <span
                                                style={{
                                                    transform:
                                                        'translate(5px,10px)',
                                                }}
                                            >
                                                Viên
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display:
                                                    'flex',
                                                paddingLeft:
                                                    '1rem',
                                            }}
                                        >
                                            <Field
                                                id={`prescription.${indexPres}.dosage.evening`}
                                                name={`prescription.${indexPres}.dosage.evening`}
                                                label="Tối"
                                                component={
                                                    Input
                                                }
                                                type="number"
                                                variant="outlined"
                                                left="-12px"
                                                required
                                            />
                                            <span
                                                style={{
                                                    transform:
                                                        'translate(5px,10px)',
                                                }}
                                            >
                                                Viên
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            id={`prescription.${indexPres}.advice`}
                                            name={`prescription.${indexPres}.advice`}
                                            label="Lời dặn"
                                            component={
                                                Input
                                            }
                                            variant="outlined"
                                            left="-12px"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                {arrayHelpers.form.values.prescription.map(
                                    (
                                        prescription,
                                        index,
                                    ) => (
                                        <div key={index}>
                                            <PrescriptionItem
                                                key={index}
                                                id={index}
                                                value={
                                                    prescription
                                                }
                                                handleRemove={
                                                    arrayHelpers.remove
                                                }
                                                setIndexPres={
                                                    setIndexPres
                                                }
                                            />
                                        </div>
                                    ),
                                )}
                                <Button
                                    variant="outlined"
                                    sx={{
                                        textTransform:
                                            'Capitalize',
                                        display: 'block',
                                        ml: 'auto',
                                    }}
                                    onClick={handleAddPres(
                                        arrayHelpers,
                                    )}
                                >
                                    Thêm
                                </Button>
                            </div>
                        );
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Hủy
                </Button>
                <Button onClick={handleClose}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
}

export default memo(PrescriptionForm);
