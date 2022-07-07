import React, {memo} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typography} from '@mui/material';
import './index.scss';
// import {
//     ArrowDownward,
//     ArrowUpward,
// } from '@mui/icons-material';
// import PropTypes from 'prop-types'

function Card({ptitle, pdata, cdata, color, icon, status}) {
    return (
        <CustomPaper className="dcardContent">
            <div className="dcardContent__title">
                <div className="dcardContent__titleIcon">
                    <FontAwesomeIcon
                        icon={icon}
                        style={{color: color}}
                    />
                </div>
                <Typography variant="h6">
                    {ptitle}
                </Typography>
            </div>
            <Typography variant="h3">{pdata}</Typography>
            {/* <div className="dcardContent__compare">
                <div
                    className="dcardContent__compare-number"
                    style={{color: color}}
                >
                    {status === 'increasing' ? (
                        <ArrowUpward
                            sx={{fontSize: '1.5rem'}}
                        />
                    ) : (
                        <ArrowDownward
                            sx={{fontSize: '1.5rem'}}
                        />
                    )}
                    {cdata}%
                </div>
                <div className="dcardContent__compare-title">
                    So với tháng trước
                </div>
            </div> */}
        </CustomPaper>
    );
}

Card.propTypes = {};

export default memo(Card);
