import * as dotenv from 'dotenv'
import {Auth} from "../../Lib/Microsoft/Auth";
import {Client} from "@microsoft/microsoft-graph-client";

dotenv.config();

export class MicrosoftGraph {

    private static client: Client;

    private static async initialize() {
        this.client = new Auth().getAuthenticatedClient(process.env.HOME_ACCOUNT_ID);
    }

    /**
     * GetUser : Get user basic information
     */
    public static async getUser(): Promise<any> {
        await this.initialize();
        return this.client.api('/me')
            .select('displayName,mail,userPrincipalName')
            .get();
    }

    /**
     * getMailFolders : Get all mail folders
     */
    public static async getMailFolders(): Promise<any>{
        await this.initialize();
        return this.client.api(`/me/mailFolders`)
            .get();
    }

    /**
     * GetInbox: Get user inbox
     */
    public static async getInbox(): Promise<any> {
       await this.initialize();
       return this.client.api('/me/mailFolders/inbox/messages')
            .select(['id', 'from', 'body', 'isRead', 'isDraft', 'receivedDateTime', 'subject'])
            .top(1)
            .orderby('receivedDateTime DESC')
            .get();
    }

    /**
     * addWarningToMessage : Add a warning to a specific mail
     * @param mail : full mail object
     */
    public static async addWarningToMail(mail: any): Promise<any> {
        const warningToAdd = `<style>
            #warning {
                position: absolute;
                z-index: 101;
                top: 0;
                left: 0;
                right: 0;
                background: #fde073;
                text-align: center;
                line-height: 1.5;
                font-size: 15px;
                overflow: hidden;
                -webkit-box-shadow: 0 0 5px black;
                -moz-box-shadow:    0 0 5px black;
                box-shadow:         0 0 5px black;v
            }
        </style>
        <div id="warning">
            L'email : <b>${mail.from?.emailAddress?.address}</b> est inconnu. <br> Cliquez-ici pour whitelister l'adresse : <a href="http://feferferfe.com">${mail.from?.emailAddress?.address}</a>
        </div><br>`;
        const contentUpdate = mail.body.content.replace(/<body[^>]*>/g, '<body>' + warningToAdd);
        const messageUpdate = {
            body: {
                contentType: "html",
                content: contentUpdate
            }
        };
        await this.initialize();
        return this.client.api(`/me/messages/${mail.id}`)
            .update(messageUpdate);
    }

    /**
     * moveMailToFolder : Move a specific mail to a specific folder
     * @param mail : full mail object
     */
    public static async moveMailToFolder(mail: any): Promise<any>{
        const message = {
            destinationId: process.env.BLACKLIST_FOLDER_ID
        };
        await this.initialize();
        return this.client.api(`/me/messages/${mail.id}/move`)
            .post(message);
    }

    /**
     * sendMail : Send a mail to a specific recipient
     * @param mailTo : Mail recipient
     * @param subject : Mail subject
     * @param templateURL: URL for mail template
     */
    public static async sendMail(mailTo: string, subject: string, templateURL: string): Promise<any>{
        const fs = require("fs");
        const template = fs.readFileSync(templateURL);
        const result = template.toString().replaceAll("[MAIL_ADDRESS]", "quentingosset7500@hotmail.com")

        const sendMail = {
            message: {
                subject: subject.toString(),
                body: {
                    contentType: 'HTML',
                    content: result
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: mailTo
                        }
                    }
                ],
            },
            saveToSentItems: "false"
        };
        await this.initialize();
        return this.client.api('/me/sendMail')
            .post(sendMail);
    }
}
