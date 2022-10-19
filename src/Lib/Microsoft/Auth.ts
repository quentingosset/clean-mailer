import {PublicClientApplication} from '@azure/msal-node';
import * as dotenv from 'dotenv';
import {cachePlugin} from './CachePlugin';
import config from '../../Config/microsoft.json';
import {Client} from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

dotenv.config();

export class Auth {

    private msalConfig: any = {
        auth: {
            clientId: process.env.CLIENT_ID,
            authority: config.aad_endpoint + config.tenant_id,
            clientSecret: process.env.CLIENT_SECRET,
        },
        cache: {
            cachePlugin: cachePlugin("./assets/cache/cache.json")
        }
    };


    private cca = new PublicClientApplication(this.msalConfig);

    // TODO
    // il faudra faire un check si des permissions on changer si oui alors on redemande l'autorisation
    getAuthenticatedClient(userId: string): Client {
        // Initialize Graph client
        return Client.init({
            // Implement an auth provider that gets a token
            // from the app's MSAL instance
            authProvider: async (done) => {
                try {
                    // Get the user's account
                    const account = await this.cca
                        .getTokenCache()
                        .getAccountByHomeId(userId);
                    if (account) {
                        // Attempt to get the token silently
                        // This method uses the token cache and
                        // refreshes expired tokens as needed
                        const result = await this.cca.acquireTokenSilent({
                            scopes: config.scope,
                            account
                        });
                        // First param to callback is the error,
                        // Set to null in success case
                        done(null, result.accessToken);
                    } else {
                        const result = await this.cca.acquireTokenByDeviceCode({
                            scopes: config.scope,
                            deviceCodeCallback: response => {
                                console.clear();
                                console.log(`${response.message}`);
                            }
                        });
                        done(null, result.accessToken);
                    }
                } catch (err) {
                    console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                    done(err, null);
                }
            }
        });
    }
}
