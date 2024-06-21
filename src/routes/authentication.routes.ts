import Router from 'express';
import AuthenticationController from '../controllers/authentication';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.post('/activate', AuthenticationController.activate);
router.get('/me', AuthenticationMiddleware.authenticated, AuthenticationController.me);

export default router;
