import React, {
    memo,
    useState,
    useMemo,
    useEffect,
} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {compare2Days, toNewDate} from '_helpers/handleDate';
import {dateMap, dayLength} from '_constants/date';
import {Box, Typography, Button} from '@mui/material';
import {
    ArrowBackIosNew,
    ArrowForwardIos,
    MyLocation,
} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectDate,
    setAnchorDay,
} from '_redux/slice/appointmentSlice';
import {formatDate} from '_helpers/handleDate';
import './index.scss';
// import PropTypes from 'prop-types'

function Calendar({data = []}) {
    const dispatch = useDispatch();

    const anchorDay = useSelector(
        state => state.appointments.anchorDay,
    );

    const [rendereDate, setRenderedDate] = useState(
        new Date(Date.now()),
    );
    const [dayActive, setDayActive] = useState(
        new Date(Date.now()),
    );
    const handleChangeMonth = monthInc => () => {
        const newDate = toNewDate(anchorDay, monthInc);
        dispatch(setAnchorDay(newDate));
        setRenderedDate(newDate);
    };
    const dayActiveChange = date => {
        setDayActive(date);
        setRenderedDate(date);
    };
    const handleChangeAnchorDay = weekOffset => () => {
        const newDate = new Date(
            anchorDay.getTime() + weekOffset * dayLength,
        );
        dispatch(setAnchorDay(newDate));
        setRenderedDate(newDate);
    };
    const goCurrentDay = date => () => {
        dispatch(setAnchorDay(date));
        dayActiveChange(date);
    };

    useEffect(() => {
        dispatch(selectDate(dayActive));
    });

    const dates = useMemo(() => {
        return Array.from(
            new Array(7),
            (_, i) =>
                new Date(
                    anchorDay.getTime() +
                        (i - anchorDay.getDay()) *
                            dayLength,
                ),
        );
    }, [anchorDay]);

    return (
        <Box className="calendar-container">
            <Box className="month">
                <Button
                    // variant="outlined"
                    startIcon={<MyLocation />}
                    onClick={goCurrentDay(
                        new Date(Date.now()),
                    )}
                    sx={{
                        textTransform: 'Capitalize',
                        mr: 'auto',
                    }}
                >
                    Hôm nay
                </Button>
                <FontAwesomeIcon
                    icon="chevron-circle-left"
                    className="chevron-circle-icon primary"
                    onClick={handleChangeMonth(-1)}
                />
                <Typography
                    variant="h5"
                    sx={{m: '0 1rem', userSelect: 'none'}}
                    color="primary"
                >{`Tháng ${
                    rendereDate.getMonth() + 1
                } - ${rendereDate.getFullYear()}`}</Typography>
                <FontAwesomeIcon
                    icon="chevron-circle-right"
                    className="chevron-circle-icon primary"
                    onClick={handleChangeMonth(1)}
                />
            </Box>
            <Box className="dates-container">
                <ArrowBackIosNew
                    className="dates-container__icon"
                    onClick={handleChangeAnchorDay(-7)}
                />
                <ArrowForwardIos
                    className="dates-container__icon"
                    onClick={handleChangeAnchorDay(7)}
                />
                <Box className="dates">
                    {dates &&
                        dates.map((date, index) => (
                            <Box
                                sx={{
                                    opacity:
                                        compare2Days(
                                            date,
                                            new Date(
                                                Date.now(),
                                            ),
                                        ) === -1
                                            ? 0.3
                                            : 1,
                                }}
                                key={index}
                                className={
                                    (!compare2Days(
                                        date,
                                        dayActive,
                                    )
                                        ? 'date--active'
                                        : !compare2Days(
                                              date,
                                              new Date(),
                                          )
                                        ? 'today'
                                        : 'date') +
                                    (data &&
                                    data.some(
                                        d =>
                                            !compare2Days(
                                                new Date(
                                                    formatDate(
                                                        d.date,
                                                        '',
                                                        'd/m/y',
                                                        true,
                                                    ),
                                                ),
                                                date,
                                            ),
                                    )
                                        ? ' dot-notify'
                                        : '')
                                }
                                onClick={() =>
                                    dayActiveChange(date)
                                }
                            >
                                <p>
                                    {dateMap.get(
                                        date.getDay(),
                                    )}
                                </p>
                                <p>
                                    {date.getMonth() ===
                                    rendereDate.getMonth()
                                        ? date.getDate()
                                        : `${date.getDate()}/ ${
                                              date.getMonth() +
                                              1
                                          }`}
                                </p>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    );
}

Calendar.propTypes = {};

export default memo(Calendar);
