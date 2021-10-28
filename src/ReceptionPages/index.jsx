import React, {Suspense, lazy} from 'react'
//import PropTypes from 'prop-types'
import {Route, Switch, useRouteMatch, Redirect} from 'react-router-dom'
import SideBar from "_components/sidebar"
import Routes from './_routes'


function ReceptionistModule(props) {
    const {path}  = useRouteMatch();    
    return (
        <div>
            <SideBar routes={Routes}/>
            <Suspense fallback={<div>Loading ...</div>}>
                <Switch>
                    {
                        Routes.map(({id, path: childPath, exact, component}) => {
                            return (
                                <Route key={id} path={`${path + childPath}`} exact={exact} component={component}/>
                            )}
                        )
                    }
                    <Route render={() => (<Redirect to={path+'/trang-chu'}/>)}/>
                </Switch>
            </Suspense>
        </div>
    )
}

ReceptionistModule.propTypes = {

}

export default ReceptionistModule



