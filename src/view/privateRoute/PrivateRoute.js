import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';;

const PrivateRoute = ({ component: Component, ...props }) => {
  const history = useHistory();
  const password = JSON.parse(localStorage.getItem('password'))
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (password) {
      history.push('/invitationList');
      setIsAllowed(true);
    } else if (password && window.location.pathname === "/login") {
      localStorage.removeItem('password')
      localStorage.removeItem('userData')
      setIsAllowed(true);
    } else if (!password) {
      history.push('/login');
      localStorage.removeItem('password')
      localStorage.removeItem('userData')
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, [password]);

  return isAllowed ? <UserRoute {...props} component={Component} /> : null;
};

export default PrivateRoute;

export const UserRoute = ({ component: Component, ...rest }) => {
  ;
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />
          </>
        )
      }}
    />
  );
};
