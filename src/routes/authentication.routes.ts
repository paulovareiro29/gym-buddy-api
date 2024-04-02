import Router from 'express';
import AuthenticationController from '../controllers/authentication';

const router = Router();

router.post('/login', AuthenticationController.login);

export default router;
