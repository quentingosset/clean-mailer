import express, {Express} from 'express';
import config from '../Config/server.json';
import * as MySQLConnector from "../Lib/Database/mysql.connector";
import routes from './api/routes';
import chalk from "chalk";

export class Server {

    private static app: Express;

    public static async run(): Promise<void> {
        console.log(chalk.yellow(`-------------------- SERVER INITIALIZATION --------------------`));
        await MySQLConnector.init();
        this.app = express();
        this.initRoute();
        this.app.listen(config.server_port, () => {
                console.log(chalk.yellow(`-------------------- Server - WebServer listening on port ${config.server_port}!`));
                console.log(chalk.green(`-------------------- SERVER STARTED ---------------------`));
            }
        );
    }

    private static initRoute(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/', routes);
    }

}
