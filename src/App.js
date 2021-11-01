import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from '_components/PrivateRoute/index';
import './App.scss';

const ReceptionistModule = lazy(() => import('./ReceptionPages'));
const DoctorModule = lazy(() => import('./DoctorPages'));
const ManagerModule = lazy(() => import('./ManagerPages'));
const Login = lazy(() => import('./PublicPages/login'));
const NotFound = lazy(() => import('_components/NotFound'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/dang-nhap"/>)}/>
            <Route path="/dang-nhap" exact component={Login}/>
            <PrivateRoute path="/tiep-tan" roles="1" component={ReceptionistModule}/>
            <PrivateRoute path="/bac-si" roles="doctor" component={DoctorModule}/>
            <PrivateRoute path="/quan-ly" roles="manager" component={ManagerModule}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
