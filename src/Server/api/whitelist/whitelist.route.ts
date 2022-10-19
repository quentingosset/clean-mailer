import {Router} from 'express';
import {request} from "./whitelist.controller";

const router = Router();

router.route('/request/').get(request);

export default router;
