import React from 'react';
import {Box, IconButton, Stack} from '@mui/material';
import {Add, Logout} from '@mui/icons-material';
import SideBar from '_components/core/SideBar';
import Header from '_components/core/Header';
import ClinicLogo from '_assets/images/clinic.png';
import {
    Route,
    Switch,
    Redirect,
    Link,
    useRouteMatch,
    // useHistory,
} from 'react-router-dom';
import authentication from '_services/firebase/authentication.service';
import {useSelector} from 'react-redux';
import RoleMap from '_constants/role';
// import {removeMe} from '_redux/slice/currentUserSlice';
// import {useDispatch} from 'react-redux';
import './index.scss';

function LoggedInApp({filteredRoutes}) {
    const {path} = useRouteMatch();
    // const dispatch = useDispatch();

    const role = useSelector(
        state => state.user.current?.role,
    );

    const onLogOut = async () => {
        try {
            // dispatch(removeMe());
            await authentication.logOut();
        } catch (error) {
            return;
        }
    };

    return (
        <Stack direction="row" className="pagewrapper">
            <Box className="pagewrapper__left">
                <img
                    className="pagewrapper__logo"
                    src={ClinicLogo}
                    alt="Clinic logo"
                />
                <SideBar filteredRoutes={filteredRoutes} />
                <IconButton
                    className="pagewrapper__logout"
                    onClick={onLogOut}
                >
                    <Logout
                        sx={{
                            transform: 'rotate(180deg)',
                        }}
                    />
                </IconButton>
            </Box>
            <Box className="pagewrapper__center">
                <Box className="pagewrapper__header">
                    <Header />
                </Box>
                <Box className="pagewrapper__main">
                    <Switch>
                        {filteredRoutes &&
                            filteredRoutes.map(
                                ({
                                    id,
                                    path: childPath,
                                    ...rest
                                }) => {
                                    return (
                                        <Route
                                            key={id}
                                            path={`${path}${childPath}`}
                                            {...rest}
                                        />
                                    );
                                },
                            )}
                        <Route
                            render={() => {
                                return (
                                    <Redirect
                                        to={`${path}/trang-chu`}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </Box>
            </Box>
            <Box
                sx={{display: {xs: 'none', lg: 'block'}}}
                className="pagewrapper__right"
            ></Box>
            {role !== 2 && (
                <Link
                    to={`${RoleMap.get(role).url}/hang-doi`}
                    className="pagewrapper__createCard"
                >
                    <div>
                        <Add
                            sx={{
                                fontSize: 32,
                                color: 'white',
                                transition: 'all .3s',
                                '&:hover': {
                                    transform:
                                        'scale(1.2,1.2)',
                                },
                                '&:active': {
                                    transform:
                                        'scale(0.9, 0.9)',
                                },
                            }}
                        />
                    </div>
                </Link>
            )}
        </Stack>
    );
}

export default LoggedInApp;
