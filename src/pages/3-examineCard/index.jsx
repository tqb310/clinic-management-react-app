import React, {lazy, Suspense} from 'react';
import {Route, Switch, Redirect, useRouteMatch} from 'react-router-dom';
import {RightBar} from '_components/shared/StyledComponent';
// import PropTypes from 'prop-types';

const MainLazy = lazy(() => import('./Main'));
const CreateFormLazy = lazy(() => import('./CreateForm'));
const DetailCard = lazy(() => import('./DetailCard'));

function Accounting(props) {
    const {path} = useRouteMatch();
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
                <Route path={path + '/'} exact component={MainLazy}/>
                <Route path={path + '/them-phieu-kham'} component={CreateFormLazy}/>
                <Route path={path + '/:id'} component={DetailCard}/>
                <Route render={() => (<Redirect to={path}/>)}/>
            </Switch>
            <RightBar>
                Yêu cầu thu phí
            </RightBar>
        </Suspense>
    )
}

Accounting.propTypes = {

}

export default Accounting

