import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import schema from './validation';
import './signup.scss';
import Loading from '../../Loading';
import Error from '../../Error';
import { StoreContext } from '../../../context';

const Signup = () => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signupHandler = () => {
    setLoading(true);
    if (!Object.keys(userInfo).length) {
      setError('Enter email and password to signup');
      setLoading(false);
      return;
    }
    const { value, error } = schema.validate(userInfo);
    if (error) {
      setError(error.message);
      setLoading(false);
      error.message.includes('confirm_password')
        ? setError('make sure your passwords match')
        : setError(error.message);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then((user) => {
        setAppState({
          ...app_state,
          isAuthenticated: true,
          user,
        });
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          setError('The password is too weak.');
        } else {
          setError(errorMessage);
        }
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loading />}
      <section className="signup">
        <h2>SIGN UP</h2>

        {error && <Error error={error} />}

        <form className="form">
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
            <label className="input_label" htmlFor="confirm_password">
              Confirm Password
            </label>

            <input
              style={
                error && error.includes('confirm_password')
                  ? { borderColor: '#ff4500' }
                  : {}
              }
              name="confirm_password"
              className="text_input"
              type="password"
              placeholder="Confirm Password"
              value={userInfo.confirm_password}
              onChange={(event) =>
                setUserInfo({
                  ...userInfo,
                  confirm_password: event.target.value,
                })
              }
            />
          </div>

          <div className="row">
            <div className="small_text">
              <span>Already have an account ? </span>
              <span>
                <a href="/signin">signin</a>
              </span>
            </div>
          </div>
        </form>

        <div className="row">
          <p>
            By signing up, you agree to our{' '}
            <a href="privacy-policy">Privacy Policy</a>
          </p>
        </div>

        <div className="row">
          <button onClick={signupHandler}>SIGN UP</button>
        </div>
      </section>
    </>
  );
};

export default Signup;
