import React, {Suspense, lazy} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Auth from '_components/core/Auth';
import PrivateRoute from '_components/core/PrivateRoute';
import NotLoggedInRoute from '_components/core/NotLoggedInRoute';
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
            <Auth>
                <Router>
                    <Switch>
                        <NotLoggedInRoute
                            path="/"
                            exact
                            component={Login}
                        />
                        <NotLoggedInRoute
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
                            role={0}
                            component={LoggedInApp}
                        />
                        <PrivateRoute
                            path="/bac-si"
                            role={1}
                            component={LoggedInApp}
                        />
                        <PrivateRoute
                            path="/quan-ly"
                            role={2}
                            component={LoggedInApp}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Auth>
        </Suspense>
    );
}

export default App;
