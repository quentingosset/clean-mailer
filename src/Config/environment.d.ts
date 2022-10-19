export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string;
            CLIENT_SECRET: string;
            HOME_ACCOUNT_ID: string;
            BLACKLIST_FOLDER_ID: string;
            DB_CONNECTION_LIMIT: number;
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_PORT: number;
            DB_DATABASE: string;
        }
    }
}
