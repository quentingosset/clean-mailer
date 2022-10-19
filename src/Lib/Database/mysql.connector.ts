import * as dotenv from 'dotenv';
import { createPool, Pool} from 'mysql';
import chalk from "chalk";
dotenv.config();

let pool: Pool;

export async function init(): Promise<void> {
    return new Promise<any>((resolve, reject) => {
        try {
            console.log(chalk.blue(`-------------------- DATABASE INITIALIZATION --------------------`));
            pool = createPool({
                connectionLimit: process.env.DB_CONNECTION_LIMIT,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                port: process.env.DB_PORT,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });

            pool.getConnection((err, connection) => {
                console.log(chalk.blue(`-------------------- Database - Check connection`));
                if (err){
                    reject(chalk.red(`-------------------- Database - Error : ${err.message}`));
                }else {
                    console.log(chalk.blue('-------------------- Database - MySql Adapter Pool generated successfully'));
                    console.log(chalk.blue(`-------------------- DATABASE STARTED --------------------`));
                    resolve(true);
                }
            });
        } catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            reject(new Error('failed to initialized pool'));
        }
    });
}

export function execute<T>(query: string, params: string[] | object): Promise<T> {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}

