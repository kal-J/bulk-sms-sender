import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Signup from './components/auth/signup/Signup';
import Signin from './components/auth/signin/Signin';
import ImportContacts from './components/import_contacts/ImportContacts';
import WriteMessage from './components/write_message/WriteMessage';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import { StoreContext } from './context';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config/firebase';
import Loading from './components/Loading';

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();


const App = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = app_state;

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAppState({ ...app_state, user, isAuthenticated: true });
      }
    });
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="app_container">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Router>
        <Layout>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/signin"
            render={() => {
              if (isAuthenticated) {
                return <Redirect to="/import-contacts" />;
              }

              return <Signin {...props} />;
            }}
          />
          <Route
            path="/signup"
            render={() => {
              if (isAuthenticated) {
                return <Redirect to="/import-contacts" />;
              }

              return <Signup {...props} />;
            }}
          />
          <Route
            path="/import-contacts"
            render={() => {
              if (!isAuthenticated) {
                return <Redirect to="/signin" />;
              }

              return <ImportContacts {...props} />;
            }}
          />
          <Route
            path="/write-message"
            render={() => {
              if (!isAuthenticated) {
                return <Redirect to="/signin" />;
              }

              return <WriteMessage {...props} />;
            }}
          />
        </Layout>
      </Router>
    </>
  );
};

export default App;
