export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DB_URI: string;
      PORT: number;
      SALT_ROUNDS: number;
      JWT_IAT: number;
      JWT_SECRET_KEY: string;
    }
  }
}
