import Router from 'express';
import AuthenticationController from '../controllers/authentication';

const router = Router();

router.post('/login', AuthenticationController.login);
router.post('/activate', AuthenticationController.activate);

export default router;
