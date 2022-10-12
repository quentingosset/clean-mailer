import {GraphHelper} from "./Microsoft/GraphHelper";

async function main() {
    try {
        console.clear();
        const graphHelper = new GraphHelper();
        const user = await graphHelper.getUser();
        console.log(user, user.mail, user.displayName, user.userPrincipalName);
        const mailPage = await graphHelper.getInbox();
        const mails = mailPage.value;

        // Output each message's details
        for (const mail of mails) {
            console.log(`Message: ${mail.subject ?? 'NO SUBJECT'}`);
            console.log(`  ID: ${mail.id ?? 'UNKNOWN'}`);
            console.log(`  From Name: ${mail.from?.emailAddress?.name ?? 'UNKNOWN'}`);
            console.log(`  From Email: ${mail.from?.emailAddress?.address ?? 'UNKNOWN'}`);
            console.log(`  Status: ${mail.isRead ? 'Read' : 'Unread'}`);
            console.log(`  Status: ${mail.isDraft ? 'Draft' : 'No Draft'}`);
            console.log(`  Received: ${mail.receivedDateTime}`);
            const updateMessage = await graphHelper.addWarningToMail(mail);
            //console.log(updateMessage);
        }
    } catch (error) {
        console.log(error);
    }
}

main();
