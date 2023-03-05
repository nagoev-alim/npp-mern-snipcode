const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/test',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
};

export default config;
