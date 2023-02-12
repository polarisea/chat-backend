export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      PORT: number;
      SALT_ROUNDS: number;
      JWT_IAT: number;
      JWT_SECRET_KEY:string;
    }
  }
}
