import * as dotenv from 'dotenv';
dotenv.config();

export const whitelistQueries = {
    RequestWhitelist: `INSERT INTO ${process.env.DB_DATABASE}.request (mail_address, date) VALUES (?, ?);`,
}
