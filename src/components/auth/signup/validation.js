import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),

  password: Joi.string().min(5).max(30),

  confirm_password: Joi.ref('password'),
})
  .with('email', 'password')
  .with('password', 'confirm_password');

//schema.validate({});
// -> { value: {}, error: '"username" is required' }

export default schema;
