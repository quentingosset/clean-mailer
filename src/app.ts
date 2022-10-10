
import {Auth} from "./Microsoft/Auth";
import {AuthenticationResult} from "@azure/msal-node";
import {Graph} from "./Microsoft/Graph";
import { Client } from "@microsoft/microsoft-graph-client";

const auth = new Auth();
const graph = new Graph();

async function main() {
    try {
        console.clear();
        const authResponse: AuthenticationResult = await auth.getAuthentication();
        //const user = await graph.getUser(authResponse.accessToken);
        //console.log(user);
    } catch (error) {
        console.log(error);
    }
}

main();
