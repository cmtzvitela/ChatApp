import validator from 'validator';

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    throw new Error('This is not a valid email');
  }
  return true;
}

export { validateEmail };
