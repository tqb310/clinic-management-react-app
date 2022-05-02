import React from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import {KeyboardArrowDown} from '@mui/icons-material';
// import {CustomPaper} from '_components/shared/StyledComponent/Paper.js';
import ProfileForm from '../ProfileForm';
import PasswordForm from '../PasswordForm';
import {useSelector} from 'react-redux';
import './index.scss';
// import PropTypes from 'prop-types'
// const {CustomPaper} = cs;

function Profile(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openProfile, setOpenProfile] =
        React.useState(false);
    const [openPass, setOpenPass] = React.useState(false);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseForm = () => {
        setOpenPass(false);
        setOpenProfile(false);
    };
    const handleMenuItemClick = num => {
        handleClose();
        if (num) setOpenPass(true);
        else setOpenProfile(true);
    };
    const name = useSelector(
        state => state.user.current.name,
    );
    // console.dir(anchorEl);
    return (
        <Box className="profile">
            <Box className="profile__avatar">
                {name?.split(' ')[0][0] +
                    name?.split(' ').slice(-1)[0][0]}
            </Box>
            <Box>
                <IconButton
                    sx={{width: 20, height: 20}}
                    onClick={handleClick}
                >
                    <KeyboardArrowDown
                        style={{color: '#2E3192'}}
                    />
                </IconButton>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => handleMenuItemClick(0)}
                >
                    Thông tin cá nhân
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick(1)}
                >
                    Cập nhật mật khẩu
                </MenuItem>
            </Menu>
            <ProfileForm
                open={openProfile}
                handleClose={handleCloseForm}
            />
            <PasswordForm
                open={openPass}
                handleClose={handleCloseForm}
            />
        </Box>
    );
}

Profile.propTypes = {};

export default Profile;
