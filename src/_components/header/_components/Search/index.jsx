import React from 'react';
import {InputBase, Paper} from '@mui/material';
import {Search} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types'

function SearchHeader() {
    return (
        <Paper className="search">
            <Search className="search__icon"/>
            <InputBase className="search__input"/>
        </Paper>
    )
}

SearchHeader.propTypes = {

}

export default SearchHeader

