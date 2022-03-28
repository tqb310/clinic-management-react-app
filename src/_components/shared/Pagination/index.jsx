import React, {memo} from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {
    ArrowBackIos,
    ArrowForwardIos,
} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types'

function Pagination({
    handleNextPage,
    handleBackPage,
    pageTotal,
    currentPage,
    rowsPerPage,
}) {
    return (
        <Box className="table-container__pagination">
            <IconButton
                className="icon-button"
                disabled={currentPage === 0}
                onClick={handleBackPage}
            >
                <ArrowBackIos className="icon" />
            </IconButton>
            <Typography variant="h6" className="page-text">
                {pageTotal ? currentPage + 1 : 0}
            </Typography>
            <Typography className="page-text">
                &nbsp;/&nbsp;
            </Typography>
            <Typography variant="h6" className="page-text">
                {Math.ceil(pageTotal / rowsPerPage)}
            </Typography>
            <IconButton
                className="icon-button"
                disabled={
                    !pageTotal ||
                    currentPage + 1 ===
                        Math.ceil(pageTotal / rowsPerPage)
                }
                onClick={handleNextPage}
            >
                <ArrowForwardIos className="icon" />
            </IconButton>
        </Box>
    );
}

Pagination.propTypes = {};

export default memo(Pagination);
