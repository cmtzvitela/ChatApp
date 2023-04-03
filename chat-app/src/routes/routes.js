const base_url = `${process.env.REACT_APP_SERVER_URL}`;

const routes = {
  logIn: `${base_url}/login`,
  signUp: `${base_url}/signup`,
};

export default routes;
