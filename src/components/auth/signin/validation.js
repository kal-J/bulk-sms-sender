import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(5).max(30),
}).with('email', 'password');

//schema.validate({});
// -> { value: {}, error: '"username" is required' }

export default schema;
