import React from 'react';
import {CustomPaper} from "_components/shared/StyledComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './index.scss';
// import PropTypes from 'prop-types'

function Card({ptitle, pdata, cdata, color, bgColor, icon}) {
    return (
        <CustomPaper className="dcardContent" style={{backgroundColor: bgColor}}>
            <div className="dcardContent__title">
                <div className="dcardContent__titleIcon">
                    <FontAwesomeIcon icon={icon} style={{color: color}}/>
                </div>
                <div className="dcardContent__titleWord">{ptitle}</div>
            </div>
            <div className="dcardContent__number">{pdata}</div>
            <div className="dcardContent__compare">
                <div className="dcardContent__compareTitle">Hôm qua</div>
                <div className="dcardContent__compareNumber" style={{color: color}}>&#8593; +{cdata}%</div>
            </div>
        </CustomPaper>
    )
}

Card.propTypes = {

}

export default Card

