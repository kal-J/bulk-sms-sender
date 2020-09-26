import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { Link, withRouter } from 'react-router-dom';
import { StoreContext } from '../context';

const NavBar = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  if (app_state.isAuthenticated) {
    return (
      <div className="navbar">
        <Link to="/">Home</Link>

        <span>|</span>
        <Link
          to="#"
          onClick={(event) => {
            event.preventDefault();
            firebase
              .auth()
              .signOut()
              .then(() => {
                setAppState({
                  ...app_state,
                  user: null,
                  isAuthenticated: false,
                });
              })
              .catch((error) => {
                setAppState({ ...app_state, appError: error.message });
              });
          }}
        >
          Log out
        </Link>
      </div>
    );
  }
  return (
    <div className="navbar">
      {props.location.pathname.includes('/signin') ? (
        <Link to="/">Home</Link>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
      <span>|</span>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default withRouter(NavBar);
