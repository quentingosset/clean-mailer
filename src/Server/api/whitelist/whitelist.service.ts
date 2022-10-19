import { execute } from "../../../Lib/Database/mysql.connector";
import {whitelistQueries} from "./whitelist.queries";

/**
 * adds a new whitelist request
 */
export const insertRequest = async (request: IRequest) => {
    const result = await execute<{ affectedRows: number }>(whitelistQueries.RequestWhitelist, [
        request.mail,
        new Date()
    ]);
    return result.affectedRows > 0;
};
