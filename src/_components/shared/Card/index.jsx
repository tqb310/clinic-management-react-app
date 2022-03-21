import React, {memo} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.scss';
// import PropTypes from 'prop-types'

function Card({ptitle, pdata, cdata, color, icon}) {
    return (
        <CustomPaper className="dcardContent">
            <div className="dcardContent__title">
                <div className="dcardContent__titleIcon">
                    <FontAwesomeIcon
                        icon={icon}
                        style={{color: color}}
                    />
                </div>
                <div className="dcardContent__titleWord">
                    {ptitle}
                </div>
            </div>
            <div className="dcardContent__number">
                {pdata}
            </div>
            <div className="dcardContent__compare">
                <div className="dcardContent__compare-title">
                    Hôm qua
                </div>
                <div
                    className="dcardContent__compare-number"
                    style={{color: color}}
                >
                    &#8593; +{cdata}%
                </div>
            </div>
        </CustomPaper>
    );
}

Card.propTypes = {};

export default memo(Card);
