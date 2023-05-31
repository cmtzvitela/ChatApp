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

export async function searchUser({ username }) {
  try {
    const getUsersArray = await axios.get(routes.searchUser, {
      username,
    });
    console.log('🚀 ~ getUsersArray:', getUsersArray.data);
    return getUsersArray.data;
  } catch (e) {
    throw new Error('Users could not be retrieved');
  }
}

export async function sendMessage(message) {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  console.log('🚀 ~ message:', message);
  const sendMessagePromise = await axios.post(routes.sendMessage, message);
  console.log('Message sent', sendMessagePromise.data);
  return sendMessagePromise.data.message;
}
