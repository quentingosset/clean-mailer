/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ICachePlugin } from "@azure/msal-node";
import * as fs from 'fs';

export const cachePlugin = (CACHE_LOCATION: string): ICachePlugin => {
    const beforeCacheAccess = async (cacheContext: { tokenCache: { deserialize: (arg0: string) => void; serialize: () => string | NodeJS.ArrayBufferView; }; }) => {
        return new Promise<void>(async (resolve, reject) => {
            if (fs.existsSync(CACHE_LOCATION)) {
                fs.readFile(CACHE_LOCATION, "utf-8", (err, data) => {
                    if (err) {
                        reject();
                    } else {
                        cacheContext.tokenCache.deserialize(data);
                        resolve();
                    }
                });
            } else {
                console.log("not exist");
                fs.writeFile(CACHE_LOCATION, cacheContext.tokenCache.serialize(), (err) => {
                    if (err) {
                        reject();
                    }
                });
            }
        });
    };

    const afterCacheAccess = async (cacheContext: { cacheHasChanged: any; tokenCache: { serialize: () => string | NodeJS.ArrayBufferView; }; }) => {
        if (cacheContext.cacheHasChanged) {
            fs.writeFile(CACHE_LOCATION, cacheContext.tokenCache.serialize(), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    };

    return {
        beforeCacheAccess,
        afterCacheAccess
    }
}

