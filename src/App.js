import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from '_components/PrivateRoute/index';
import DoctorModule from 'DoctorPages/index';
import ReceptionistModule from 'ReceptionPages/index';
import ManagerModule from 'ManagerPages/index';
import NotFound from '_components/NotFound';
import Login from 'PublicPages/login';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact={true} component={Login}/>
        <PrivateRoute path="/tiep-tan" roles="receptionist" component={ReceptionistModule}/>
        <PrivateRoute path="/bac-si" roles="doctor" component={DoctorModule}/>
        <PrivateRoute path="/quan-ly" roles="manager" component={ManagerModule}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
