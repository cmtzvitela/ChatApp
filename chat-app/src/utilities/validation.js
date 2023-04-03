import validator from 'validator';

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

function validatePassword(password) {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  });
}

export { validateEmail, validatePassword };
