import React from 'react';
import {InputBase} from '@mui/material';
import {Search} from '@mui/icons-material';
import {CustomPaper} from '_components/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function SearchHeader() {
    return (
        <CustomPaper className="search">
            <Search className="search__icon"/>
            <InputBase className="search__input" placeholder="Tìm kiếm..."/>
        </CustomPaper>
    )
}

SearchHeader.propTypes = {

}

export default SearchHeader

