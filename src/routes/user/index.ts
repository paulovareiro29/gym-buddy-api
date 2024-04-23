import Router from 'express';
import UserController from '../../controllers/user';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import plans from './plan.routes';
const router = Router();

router
  .use('/', plans)
  .get('/', AuthenticationMiddleware.authenticated, UserController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserController.find)
  .put('/:id', AuthenticationMiddleware.authenticated, UserController.patch);

export default router;