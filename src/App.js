import React, {Suspense, lazy} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
// import PrivateRoute from "_components/core/PrivateRoute/index";
import {Box, IconButton} from '@mui/material';
import {Add, Logout} from '@mui/icons-material';
import SideBar from '_components/core/SideBar';
import Header from '_components/core/Header';
// import { Scrollbars } from "react-custom-scrollbars-2";
import ClinicLogo from '_assets/images/clinic.png';
import authentication from '_services/authentication.service';
import Routes from 'pages/_routes';
import './App.scss';

const Login = lazy(() => import('./pages/login'));
const Customer = lazy(() => import('./pages/customer'));
// const NotFound = lazy(() => import("./_components/core/NotFound"));

function App() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            {authentication.getCurrentUser() ? (
                <Router>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Redirect to="/dang-nhap" />
                            )}
                        />
                        <Route
                            path="/dang-nhap"
                            exact
                            component={Login}
                        />
                        <Route
                            path="/dat-lich-hen"
                            exact
                            component={Customer}
                        />
                        <Route
                            render={() => (
                                <Redirect to="/dang-nhap" />
                            )}
                        />
                    </Switch>
                </Router>
            ) : (
                <Box className="pagewrapper">
                    <Router>
                        <Box className="pagewrapper__left">
                            <img
                                className="pagewrapper__logo"
                                src={ClinicLogo}
                                alt="Clinic logo"
                            />
                            <SideBar routes={Routes} />
                            <IconButton
                                className="pagewrapper__logout"
                                onClick={() =>
                                    authentication.logout()
                                }
                            >
                                <Logout
                                    sx={{
                                        transform:
                                            'rotate(180deg)',
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
                                    {Routes.map(
                                        ({
                                            id,
                                            path,
                                            exact,
                                            component,
                                            name,
                                        }) => {
                                            return (
                                                <Route
                                                    key={id}
                                                    name={
                                                        name
                                                    }
                                                    path={
                                                        path
                                                    }
                                                    exact={
                                                        exact
                                                    }
                                                    component={
                                                        component
                                                    }
                                                />
                                            );
                                        },
                                    )}
                                    <Route
                                        render={() => {
                                            return (
                                                <Redirect to="/trang-chu" />
                                            );
                                        }}
                                    />
                                </Switch>
                            </Box>
                        </Box>
                        <Box className="pagewrapper__right"></Box>
                        <Link to="/phieu-kham/them-phieu-kham">
                            <div className="pagewrapper__createCard">
                                <Add
                                    sx={{
                                        fontSize: 32,
                                        color: 'white',
                                        transition:
                                            'all .3s',
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
                    </Router>
                </Box>
            )}
        </Suspense>
    );
}

export default App;
