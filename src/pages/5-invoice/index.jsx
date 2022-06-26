import React, {lazy, Suspense} from 'react';
import {
    Route,
    Switch,
    Redirect,
    useRouteMatch,
} from 'react-router-dom';
import {RightBar} from '_components/shared/StyledComponent';
import IncomeStat from './_components/IncomeStat';
// import PropTypes from 'prop-types';

const MainLazy = lazy(() => import('./subpages/Main'));
const DetailCard = lazy(() =>
    import('./subpages/DetailCard'),
);

function Invoice(props) {
    const {path} = useRouteMatch();

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
                <Route
                    path={path + '/'}
                    exact
                    component={MainLazy}
                />
                <Route
                    path={path + '/:id'}
                    component={DetailCard}
                />
                <Route
                    render={() => <Redirect to={path} />}
                />
            </Switch>
            <RightBar
                sx={{
                    borderLeft: '2px solid #eee',
                    px: 2,
                    py: 3,
                }}
            >
                <IncomeStat />
            </RightBar>
        </Suspense>
    );
}

Invoice.propTypes = {};

export default Invoice;
