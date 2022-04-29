import React, {lazy, Suspense, useEffect} from 'react';
import {
    Route,
    Switch,
    Redirect,
    useRouteMatch,
} from 'react-router-dom';
import {RightBar} from '_components/shared/StyledComponent';
import IncomeStat from './_components/IncomeStat';
import {setDataAsync} from '_redux/slice/invoiceSlice';
import {useDispatch} from 'react-redux';
// import PropTypes from 'prop-types';

const MainLazy = lazy(() => import('./subpages/Main'));
const CreateFormLazy = lazy(() =>
    import('./subpages/CreateForm'),
);
const DetailCard = lazy(() =>
    import('./subpages/DetailCard'),
);

function Invoice(props) {
    const {path} = useRouteMatch();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDataAsync());
    }, []);
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
                <Route
                    path={path + '/'}
                    exact
                    component={MainLazy}
                />
                <Route
                    path={path + '/them-phieu-kham'}
                    component={CreateFormLazy}
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
