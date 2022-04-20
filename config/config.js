const envVariables = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DB: process.env.MONGO_DB,
  REDIS_SECRET: process.env.REDIS_SECRET,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_URL: process.env.REDIS_URL || `redis://default:password@redis:6379`,
};

module.exports = envVariables;
