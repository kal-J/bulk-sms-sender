const dotenv = require('dotenv');
dotenv.config();

const config = {
  service_sid: process.env.TWILIO_SERVICE_SID,
  account_sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
};

module.exports = config;
