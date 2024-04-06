import Router from 'express';
import UserController from '../controllers/user';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, UserController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserController.find)
  .post('/', AuthenticationMiddleware.authenticated, UserController.create)
  .put('/:id', AuthenticationMiddleware.authenticated, UserController.patch);

export default router;
