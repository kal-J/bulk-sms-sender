import React, { useContext, useState } from 'react';
import './signin.scss';
import { StoreContext } from '../../../context';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import schema from './validation';
import Loading from '../../Loading';
import Error from '../../Error';

const provider = new firebase.auth.GoogleAuthProvider();

const Signin = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const signinHandler = (event) => {
    setLoading(true);
    if (!Object.keys(userInfo).length) {
      setError('Enter email and password to signin');
      setLoading(false);
      return;
    }
    const { value, error } = schema.validate(userInfo);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (value.email === '' && value.password === '') {
      setLoading(false);
      setError('Enter email and password to signin');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then((user) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const accessToken = user.accessToken;
        // The signed-in user info.

        setAppState({
          ...app_state,
          isAuthenticated: true,
          user,
        });
        setLoading(false);

        props.history.push('/import-contacts');
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          setError(errorMessage);
        } else setError('something went wrong, try again');
        setLoading(false);
      });
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    if (userInfo.email) {
      setLoading(true);
      firebase
        .auth()
        .sendPasswordResetEmail(userInfo.email)
        .then(() => {
          setLoading(false);
          window.alert('Password reset link sent to your email');
        })
        .catch((error) => {
          if (error) setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <section className="signin">
        <h2>SIGN IN</h2>
        {error && <Error error={error} />}

        <form className="form">
          <div className="row">
            <span
              onClick={() => {
                firebase
                  .auth()
                  .signInWithPopup(provider)
                  .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //const accessToken = result.credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;

                    setAppState({
                      ...app_state,
                      isAuthenticated: true,
                      user,
                    });
                    window.location.reload();

                    props.history.push('/import-contacts');
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    // const credential = error.credential;
                    setError(errorMessage);
                  });
              }}
              className="gmail_signin"
            >
              SIGN IN WITH GMAIL
            </span>
          </div>

          <div className="row">
            <div className="seperator">
              <hr />

              <span>or</span>

              <hr />
            </div>
          </div>

          <div className="row">
            <label className="input_label" htmlFor="email">
              Email
            </label>
            <input
              style={
                error && error.includes('email')
                  ? { borderColor: '#ff4500' }
                  : {}
              }
              name="email"
              className="text_input"
              type="text"
              placeholder="Email"
              value={userInfo.email}
              onChange={(event) =>
                setUserInfo({ ...userInfo, email: event.target.value })
              }
            />
          </div>

          <div className="row">
            <label className="input_label" htmlFor="password">
              Password
            </label>
            <input
              style={
                error && error.includes('password')
                  ? { borderColor: '#ff4500' }
                  : {}
              }
              name="password"
              className="text_input"
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(event) =>
                setUserInfo({ ...userInfo, password: event.target.value })
              }
            />
          </div>

          <div className="row">
            <div className="small_text">
              <span>Forgot password ? </span>
              <span>
                <a onClick={resetPasswordHandler} href="/#">
                  reset password
                </a>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="small_text">
              <span>Don't have an account ? </span>
              <span>
                <a href="/signup">sign up</a>
              </span>
            </div>
          </div>
        </form>

        <div className="row">
          <p>
            By signing in, you agree to our{' '}
            <a href="privacy-policy">Privacy Policy</a>
          </p>
        </div>

        <div className="row">
          <button onClick={signinHandler} className="signin">
            SIGN IN
          </button>
        </div>
      </section>
    </>
  );
};

export default withRouter(Signin);
