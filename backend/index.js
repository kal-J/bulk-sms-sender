const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const twilio = require('twilio');
const config = require('./twilio');
const firebase = require('firebase/app');
const fbConfig = require('./config/firebase');

require('firebase/firestore');

!firebase.apps.length ? firebase.initializeApp(fbConfig) : firebase.app();

const app = express();

// twilio setup
const { account_sid, auth_token, service_sid } = config;
const client = twilio(account_sid, auth_token);

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3005;

// Routes
app.get('/', (req, res) => {
  res.send('Hello from UG BULK SMS');
});

app.post('/send-message', (req, res) => {
  try {
    const { msg, phoneNumbers } = req.body;
    sendMessage(msg, phoneNumbers)
      .then(() => {
        saveMessageContacts(phoneNumbers, null)
          .then(() =>
            res.json({
              message: 'Message has been sent and contact(s) saved',
              sent: true,
            })
          )
          .catch(() =>
            res.json({
              status:
                'Message has been sent but contact(s) have not been saved',
              sent: true,
            })
          );
      })
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
        res.json({
          status: 'Failed to send message, an error occured',
          sent: false,
        });
      });
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    res.json({
      status: 'Failed to send message, an error occured',
      sent: false,
    });
  }
});

const sendMessage = (msg, phone_number_array) => {
  return new Promise((resolve, reject) => {
    const bindingtypeJson = '"binding_type":"sms"';
    let toBindingJson = '{';

    phone_number_array.forEach((value) => {
      toBindingJson = toBindingJson + `${bindingtypeJson},"address":"${value}"`;
    });
    toBindingJson = toBindingJson + '}';
    console.log(toBindingJson);

    // const notificationOpts = {
    //   toBinding: toBindingJson,
    //   body: msg,
    // };

    /**
     * JSON.stringify({
        binding_type: 'sms',
        address: '+256776017168',
      })
     */
    const notificationOpts = {
      toBinding: toBindingJson,
      body: msg,
    };

    client.notify
      .services(service_sid)
      .notifications.create(notificationOpts)
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
};

const saveMessageContacts = (phoneNumbers, contacts_title) => {
  return new Promise((resolve, reject) => {
    // store numbers in firestore
    const doc_name = `${contacts_title || new Date().toISOString()}`;

    firebase
      .firestore()
      .collection('message_contacts')
      .doc(doc_name)
      .set({
        message_sent_to: phoneNumbers,
      })
      .then(() => {
        return resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

app.listen(port, () => console.log(`App listening on port : ${port}`));
