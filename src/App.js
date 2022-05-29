import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './view/login';
import PrivateRoute from './view/privateRoute/PrivateRoute';
import InvitationList from './view/userList/InvitationList';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect push to="/login" />
          </Route>
          <PrivateRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/invitationList" component={InvitationList} />
        </Switch>
      </BrowserRouter>
      <ToastContainer position="top-right" theme="colored" />
    </React.Fragment>
  );
}

export default App;
