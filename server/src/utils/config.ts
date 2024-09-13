const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  CRYPTO_SECRET: process.env.CRYPTO_SECRET,
  CRYPTO_IV: process.env.CRYPTO_IV,
  // @ts-ignore
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
  MASTER_PASSWORD: process.env.MASTER_PASSWORD,
  LOG_DIRECTORY: process.env.LOG_DIRECTORY,
  ENCRYPTION_SECRET:
    process.env.ENCRYPTION_SECRET ?? 'e0e84e4138d2e5c7eaf2e6d22f33a647',
  IV_HEX_STRING:
    process.env.IV_HEX_STRING ?? '1a583e157cfde819305f7a7409163c88',
  DEPLOYED_FRONTEND_HOSTNAME: process.env.DEPLOYED_FRONTEND_HOSTNAME,
  DEPLOYED_BACKEND_HOSTNAME: process.env.DEPLOYED_BACKEND_HOSTNAME,
  BACKEND_POST: process.env.BACKEND_PORT,
  FRONTEND_PORT: process.env.FRONTEND_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_LOGGING: process.env.DB_LOGGING,
};

export default CONFIG;
