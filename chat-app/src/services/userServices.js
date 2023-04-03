import axios from 'axios';
import routes from '../routes/routes.js';

export async function userLogin(userEmail, userPassword) {
  const getLoginPromise = await axios.post(routes.logIn, {
    email: userEmail,
    password: userPassword,
  });
  console.log('Login promise', getLoginPromise.data);
  return getLoginPromise.data.user;
}

export async function userSignUp(user) {
  const getSignUpPromise = await axios.post(routes.signUp, {
    username: user.username,
    password: user.password,
    email: user.email,
  });
  console.log('SignUp promise', getSignUpPromise.data);
  return getSignUpPromise.data;
}
