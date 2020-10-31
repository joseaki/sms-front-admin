const host =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_BACKEND
    : process.env.REACT_APP_PROD_BACKEND;
export default host;
