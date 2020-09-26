import React, { useState, useContext } from 'react';
import Axios from 'axios';
import './write_message.scss';
import { withRouter } from 'react-router-dom';
import Error from '../Error';
import { StoreContext } from '../../context';
import Loading from '../Loading';

const WriteMessage = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <section className="write_message">
        <div className="progress_bar_wrapper">
          <div className="progress_bar"></div>
        </div>

        <div>
          <h3>step 2 : Write Message</h3>
        </div>
        {error && <Error error={error} />}

        <div className="text_area">
          <textarea
            placeholder="Write your message here..."
            name="phone_numbers"
            cols="30"
            rows="10"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        <div className="row">
          <button
            className="cancel"
            onClick={() => {
              // Verify phone numbers and convert to json
              //if success , navigate to write message
              props.history.push('/import-contacts');
            }}
          >
            CANCEL
          </button>
          <button
            className="continue"
            onClick={() => {
              setLoading(true);
              Axios.post('http://localhost:3005/send-message', {
                msg: message,
                phoneNumbers: app_state.phoneNumbers,
              })
                .then(({ data }) => {
                  setLoading(false);
                  if (data.sent) {
                    props.history.push('/');
                    alert(data.message);

                    setAppState({ ...app_state, phoneNumbers: null });
                  } else {
                    setLoading(false);
                    setError('something went wrong, try again');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  setError(error.message);
                });
            }}
          >
            SEND
          </button>
        </div>
      </section>
    </>
  );
};

export default withRouter(WriteMessage);
