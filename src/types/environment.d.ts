export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string;
            CLIENT_SECRET: string;
            HOME_ACCOUNT_ID: string;
        }
    }
}
