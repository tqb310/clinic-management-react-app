import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import Routes from './_routes';
import PageWrapper from '_components/core/PageWrapper';
//import PropTypes from 'prop-types'


function ReceptionistModule(props) {
    const {path}  = useRouteMatch();    
    return (
        <div>
           <PageWrapper routes={Routes} currentPath={path}/>
        </div>
    )
}

ReceptionistModule.propTypes = {

}

export default ReceptionistModule



