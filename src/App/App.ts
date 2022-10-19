import * as dotenv from 'dotenv';
import {MicrosoftGraph} from "../Helpers/Microsoft/MicrosoftGraph";
import * as MySQLConnector from '../Lib/Database/mysql.connector';
import chalk from "chalk";
dotenv.config();

export class App {

    public static async run(): Promise<void> {
        console.log(chalk.yellow(`-------------------- APP INITIALIZATION --------------------`));
        await MySQLConnector.init();
        const params = process.argv.slice(2);
        console.log(chalk.green(`-------------------- APP STARTED --------------------`));
        // console.log(process.env.SERVER_PORT);
        // console.clear();
        // const user = await MicrosoftGraph.getUser();
        // console.log(user, user.mail, user.displayName, user.userPrincipalName);
        // const mailPage = await MicrosoftGraph.getInbox();
        // const mails = mailPage.value;

        // Output each message's details
        /*for (const mail of mails) {
            console.log(`Message: ${mail.subject ?? 'NO SUBJECT'}`);
            console.log(`  ID: ${mail.id ?? 'UNKNOWN'}`);
            console.log(`  From Name: ${mail.from?.emailAddress?.name ?? 'UNKNOWN'}`);
            console.log(`  From Email: ${mail.from?.emailAddress?.address ?? 'UNKNOWN'}`);
            console.log(`  Status: ${mail.isRead ? 'Read' : 'Unread'}`);
            console.log(`  Status: ${mail.isDraft ? 'Draft' : 'No Draft'}`);
            console.log(`  Received: ${mail.receivedDateTime}`);
            const updateMessage = await microsoftGraph.addWarningToMail(mail);
            await microsoftGraph.moveMailToFolder(mail);
            console.log("done");
        }*/

        //await MicrosoftGraph.sendMail("quentingosset7500@hotmail.com", "Your email is temporarily blacklisted", "./assets/ressources/templates/mailing.html");
    }

}
