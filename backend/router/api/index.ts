import { Router } from 'express';
import * as userController from '../../controllers/user.controller';

const router = Router();

router.post('/login', userController.login);
router.get('/check', userController.checkToken);

export default router;
