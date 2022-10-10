import {AuthenticationResult, PublicClientApplication} from '@azure/msal-node';
import * as dotenv from 'dotenv';
import {cachePlugin} from './CachePlugin';
import config from '../../src/config.json';

dotenv.config();

export class Auth {

    private msalConfig: any = {
        auth: {
            clientId: process.env.CLIENT_ID,
            authority: config.aad_endpoint + config.tenant_id,
            clientSecret: process.env.CLIENT_SECRET,
        },
        cache: {
            cachePlugin: cachePlugin("./data/cache.json")
        }
    };
    private cca = new PublicClientApplication(this.msalConfig);

    async getAuthentication(): Promise<AuthenticationResult> {

        const msalTokenCache = this.cca.getTokenCache();
        let authenticationResult;

        const accounts = await msalTokenCache.getAllAccounts();
        // Acquire Token Silently if an account is present
        if (accounts.length > 0) {
            const silentRequest = {
                account: accounts[0], // Index must match the account that is trying to acquire token silently
                scopes: config.scope,
            };
            await this.cca.acquireTokenSilent(silentRequest).then((response) => {
                    authenticationResult = response;
                    console.clear();
                    console.log("Successful Silent token acquisition");
                }).catch((error) => {
                    console.clear();
                    console.log(error, error.errorMessage);
                    return process.exit(1);
                });
        } else { // fall back to username password if there is no account
            await this.cca.acquireTokenByDeviceCode({
                scopes: config.scope,
                deviceCodeCallback: response => {
                    console.clear();
                    console.log(`${response.message}`);
                }
            }).then((response: AuthenticationResult) => {
                authenticationResult = response;
                console.clear();
                console.log("Successful Client token acquisition")
            }).catch((error) => {
                console.clear();
                console.log(error.errorMessage);
                return process.exit(1);
            });
        }

        return authenticationResult;
    }
}
