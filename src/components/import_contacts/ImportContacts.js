import React, { useState, useContext } from 'react';
import './import_contacts.scss';
import { withRouter } from 'react-router-dom';
import Error from '../Error';
import { StoreContext } from '../../context';

// phone number array to string with ; appended
const phoneNumberArrayToString = (arr) => {
  let result = '';
  if (arr) {
    arr.forEach((val, index) => {
      result = result + `${val};`;
    });
  }

  return result;
};
const ImportContacts = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [phoneNumbers, setPhoneNumbers] = useState(
    phoneNumberArrayToString(app_state.phoneNumbers)
  );
  const [error, setError] = useState('');

  const onContinueHandler = () => {
    if (phoneNumbers === '') {
      setError('Enter valid phone number(s)');
      return;
    }

    const trimed_numbers = phoneNumbers.trim();
    const split_by_semicolon = trimed_numbers.split(';');
    const split_phoneNumbers = split_by_semicolon.filter(
      (value) => value.length === 13
    );

    if (split_phoneNumbers.length) {
      setAppState({ ...app_state, phoneNumbers: split_phoneNumbers });
      props.history.push('/write-message');
    } else {
      setError('one or more phone number(s) invalid');
      return;
    }

  };

  return (
    <section className="import_contacts">
      <div className="progress_bar_wrapper">
        <div className="progress_bar"></div>
      </div>

      <div>
        <h3>step 1 : Enter Phone numbers</h3>
      </div>

      {error && <Error error={error} />}

      <div className="text_area">
        <textarea
          placeholder="Enter phone numbers seperated by a semi-colon (;). Please include the country code (+256) E.g +256787113924;+256776017168;+256753853096"
          name="phone_numbers"
          cols="30"
          rows="10"
          value={phoneNumbers}
          onChange={(event) => setPhoneNumbers(event.target.value)}
        ></textarea>
      </div>

      <div className="row">
        <button
          className="cancel"
          onClick={() => {
            props.history.push('/');
          }}
        >
          CANCEL
        </button>
        <button className="continue" onClick={onContinueHandler}>
          CONTINUE
        </button>
      </div>
    </section>
  );
};

export default withRouter(ImportContacts);
