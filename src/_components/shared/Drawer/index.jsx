import React, {memo} from 'react';
import {Box} from '@mui/material';
import './index.scss';
// import PropTypes from 'prop-types'

function Drawer({children, anchor, onClose, open}) {
    return (
        <Box className={`drawer ${open ? 'active' : ''}`}>
            <Box
                className="drawer__overlay"
                onClick={onClose}
            ></Box>
            <Box
                className="drawer__content"
                sx={{
                    [anchor]: 0,
                    transform:
                        anchor === 'left'
                            ? 'translateX(-100%)'
                            : 'translateX(100%)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

Drawer.propTypes = {};

export default memo(Drawer);
