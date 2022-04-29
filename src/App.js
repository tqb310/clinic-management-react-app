import React, {Suspense, lazy} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Auth from '_components/core/Auth';
import PrivateRoute from '_components/core/PrivateRoute';
// import NotLoggedInRoute from '_components/core/NotLoggedInRoute';
import LoggedInApp from '_components/core/LoggedInApp';
import './App.scss';

const Login = lazy(() => import('./pages/login'));
const Customer = lazy(() => import('./pages/customer'));
const NotFound = lazy(() =>
    import('./_components/core/NotFound'),
);

function App() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Router>
                <Auth>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={Login}
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
                        <PrivateRoute
                            path="/tiep-tan"
                            role={1}
                            component={LoggedInApp}
                        />
                        <PrivateRoute
                            path="/bac-si"
                            role={2}
                            component={LoggedInApp}
                        />
                        <PrivateRoute
                            path="/quan-ly"
                            role={3}
                            component={LoggedInApp}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Auth>
            </Router>
        </Suspense>
    );
}

export default App;
