import React from 'react';
import Routes from "./_routes"
import PageWrapper from '_components/PageWrapper';
import {useRouteMatch} from 'react-router-dom';
//import PropTypes from 'prop-types'

function ManagerModule(props) {
    const {path}  = useRouteMatch(); 
    return (
        <div>
            <PageWrapper routes={Routes} currentPath={path}/>
        </div>
    )
}

ManagerModule.propTypes = {

}

export default ManagerModule

