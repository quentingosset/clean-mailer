/**
 * Ask to be whitelisted
 *
 * @param req Express Request
 * @param res Express Response
 */
import {Request, RequestHandler, Response} from "express";
import * as WhitelistService from './whitelist.service';

export const request: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await WhitelistService.insertRequest(req.body);
        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[teams.controller][addTeam][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when adding new team'
        });
    }
};
