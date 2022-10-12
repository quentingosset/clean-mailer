import * as dotenv from 'dotenv'
import {Auth} from "./Auth";
import {Client} from "@microsoft/microsoft-graph-client";

dotenv.config();

export class GraphHelper {

    private client: Client = undefined;

    private async initialize() {
        this.client = new Auth().getAuthenticatedClient(process.env.HOME_ACCOUNT_ID);
    }

    /**
     * GetUser : Get user basic information
     */
    async getUser(): Promise<any> {
        await this.initialize();
        return this.client.api('/me')
            .select('displayName,mail,userPrincipalName')
            .get();
    }

    /**
     * GetInbox: Get user inbox
     */
    async getInbox(): Promise<any> {
       await this.initialize();
       return this.client.api('/me/mailFolders/inbox/messages')
            .select(['id', 'from', 'body', 'isRead', 'isDraft', 'receivedDateTime', 'subject'])
            .top(1)
            .orderby('receivedDateTime DESC')
            .get();
    }

    /**
     * addWarningToMessage : Add a warning to a specific mail
     * @param mail : the full mail object
     */
    async addWarningToMail(mail: any): Promise<any> {
        const warningToAdd = `<style>
            #warning {
                position: absolute;
                z-index: 101;
                top: 0;
                left: 0;
                right: 0;
                background: #fde073;
                text-align: center;
                line-height: 2.5;
                overflow: hidden;
                -webkit-box-shadow: 0 0 5px black;
                -moz-box-shadow:    0 0 5px black;
                box-shadow:         0 0 5px black;
            }
        </style>
        <div id="warning">
            L'email : <b>${mail.from?.emailAddress?.address}</b> est inconnu. <br> Cliquez-ici pour l'ajouter dans la whitelist : <a href="http://feferferfe.com">${mail.from?.emailAddress?.address}</a>
        </div>`;
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

}
