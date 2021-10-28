import React from 'react';
import DateTime from './_components/DateTime';
//import PropTypes from 'prop-types'
import './index.scss';



function Header(props) {
    return (
        <div>            
            <DateTime/>
        </div>
    )
}

Header.propTypes = {

}

export default Header

