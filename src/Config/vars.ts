const config = {
  development: {
    host: process.env.REACT_APP_DEV_BACKEND || '',
  },
  production: {
    host: process.env.REACT_APP_PROD_BACKEND || '',
  },
  test: {
    host: process.env.REACT_APP_TEST_BACKEND || '',
  },
};

export default config[process.env.NODE_ENV];
