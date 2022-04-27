import React from 'react';
import {Box, IconButton} from '@mui/material';
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
} from 'react-router-dom';
import 'index.scss';

function LoggedInApp({filteredRoutes}) {
    const {path} = useRouteMatch();

    return (
        <Box className="pagewrapper">
            <Box className="pagewrapper__left">
                <img
                    className="pagewrapper__logo"
                    src={ClinicLogo}
                    alt="Clinic logo"
                />
                <SideBar filteredRoutes={filteredRoutes} />
                <IconButton
                    className="pagewrapper__logout"
                    onClick={() => {}}
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
                                            path={`${path}/${childPath}`}
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
            <Box className="pagewrapper__right"></Box>
            <Link to="/">
                <div className="pagewrapper__createCard">
                    <Add
                        sx={{
                            fontSize: 32,
                            color: 'white',
                            transition: 'all .3s',
                            '&:hover': {
                                transform: 'scale(1.2,1.2)',
                            },
                            '&:active': {
                                transform:
                                    'scale(0.9, 0.9)',
                            },
                        }}
                    />
                </div>
            </Link>
        </Box>
    );
}

export default LoggedInApp;
