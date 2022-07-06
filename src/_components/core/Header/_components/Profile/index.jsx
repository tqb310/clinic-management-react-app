import React, {memo} from 'react';
import {
    Box,
    IconButton,
    // Menu,
    // MenuItem,
    Button,
} from '@mui/material';
import {KeyboardArrowDown} from '@mui/icons-material';
import ProfileForm from '../ProfileForm';
import {useSelector} from 'react-redux';
import './index.scss';
// import PasswordForm from '../PasswordForm';
// import {CustomPaper} from '_components/shared/StyledComponent/Paper.js';
// import PropTypes from 'prop-types'
// const {CustomPaper} = cs;

function Profile(props) {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [openProfile, setOpenProfile] =
        React.useState(false);
    // const [openPass, setOpenPass] = React.useState(false);
    const handleClick = event => {
        // setAnchorEl(event.currentTarget);
        setOpenProfile(true);
    };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    const handleCloseForm = () => {
        // setOpenPass(false);
        setOpenProfile(false);
    };
    // const handleMenuItemClick = num => {
    //     handleClose();
    //     if (num) setOpenPass(true);
    //     else setOpenProfile(true);
    // };
    const profileData = useSelector(
        state => state.user.current,
    );
    // console.dir(anchorEl);
    return (
        <>
            <Button
                className="profile"
                onClick={handleClick}
            >
                <Box className="profile__avatar">
                    {profileData.name
                        ? profileData.name?.split(
                              ' ',
                          )[0][0] +
                          profileData.name
                              ?.split(' ')
                              .slice(-1)[0][0]
                        : ''}
                </Box>
                <Box>
                    <IconButton
                        sx={{width: 20, height: 20}}
                    >
                        <KeyboardArrowDown
                            style={{color: '#2E3192'}}
                        />
                    </IconButton>
                </Box>
            </Button>
            {/* <Menu
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
            </Menu> */}
            <ProfileForm
                open={openProfile}
                handleClose={handleCloseForm}
                data={profileData}
            />
            {/* <PasswordForm
                open={openPass}
                handleClose={handleCloseForm}
            /> */}
        </>
    );
}

Profile.propTypes = {};

export default memo(Profile);
