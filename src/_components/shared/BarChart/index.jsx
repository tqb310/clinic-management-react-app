import React, {memo} from 'react';
import {Button, Typography} from '@mui/material';
import {KeyboardArrowDown} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function BarChart({title, yAxis, height, data, widthItem}) {
    const max = data.reduce(
        (a, b) => (a > b.value ? a : b.value),
        0,
    );
    const contentHeight =
        (((height - 40) * 0.9) / yAxis.length) *
        (yAxis.length - 1);
    const valuePerPxl =
        contentHeight / yAxis[yAxis.length - 1];
    return (
        <CustomPaper className="BarChart" sx={{height}}>
            <div className="BarChart__header">
                <Typography variant="h5">
                    {title}
                </Typography>
                <span>
                    <Button
                        sx={{
                            color: '#25282B',
                            textTransform: 'capitalize',
                            padding: 0,
                            fontSize: 13,
                            textAlign: 'center',
                        }}
                        endIcon={
                            <KeyboardArrowDown
                                style={{color: '#2E3192'}}
                            />
                        }
                    >
                        Hàng tháng
                    </Button>
                </span>
            </div>
            <div
                className="BarChart__frame"
                style={{height: height - 40 + 'px'}}
            >
                <table>
                    {yAxis &&
                        [...yAxis]
                            .reverse()
                            .map((num, index) => (
                                <tr key={index}>
                                    <td>{`${num}${
                                        index ? '' : '+'
                                    }`}</td>
                                    <td>
                                        <div className="BarChart__dotline"></div>
                                    </td>
                                </tr>
                            ))}
                </table>
            </div>
            <div
                className="BarChart__content"
                style={{height: height - 40 + 'px'}}
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="BarChart__item"
                        style={{width: widthItem + 'px'}}
                    >
                        <div
                            className={`BarChart__shape-item ${
                                item.value === max
                                    ? ' max'
                                    : ''
                            }`}
                            style={{
                                height:
                                    Math.min(
                                        contentHeight,
                                        item.value *
                                            valuePerPxl,
                                    ) + 'px',
                            }}
                        >
                            {item.value}
                        </div>
                        <div className="BarChart__title-item">
                            {item.key}
                        </div>
                    </div>
                ))}
            </div>
        </CustomPaper>
    );
}

BarChart.propTypes = {};

export default memo(BarChart);
