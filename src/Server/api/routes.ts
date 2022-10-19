import {Router} from 'express';
import whitelistRoute from "./whitelist/whitelist.route";

const router = Router();

router.use('/whitelist/', whitelistRoute);

export default router;
