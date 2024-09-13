namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    CRYPTO_SECRET: string;
    CRYPTO_IV: string;
    SALT_ROUNDS: number;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    MASTER_PASSWORD: string;
    LOG_DIRECTORY: string;
    ENCRYPTION_SECRET: string;
    IV_HEX_STRING: string;

    DEPLOYED_FRONTEND_HOSTNAME: string;
    DEPLOYED_BACKEND_HOSTNAME: string;
    BACKEND_POST: number;
    FRONTEND_PORT: number;

    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;

    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_DIALECT: string;
    DB_LOGGING: boolean;

    GOOGLE_OAUTH_CLIENT_ID: string;
    GOOGLE_OAUTH_CLIENT_SECRET: string;
    GOOGLE_OAUTH_REDIRECT_URI: string;
    GOOGLE_API_BASE_URL: string;
  }
}
