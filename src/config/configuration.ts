export default () => ({
  port: process.env.PORT || '',
  nodeEnv: process.env.NODE_ENV || '',
  token: process.env.TOKEN || '',
  apiUrl: process.env.API_URL || '',
});
