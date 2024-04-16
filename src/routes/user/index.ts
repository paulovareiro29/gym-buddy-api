import Router from 'express';
import UserController from '../../controllers/user';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import UserPlan from './plan.routes';
const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, UserController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserController.find)
  .put('/:id', AuthenticationMiddleware.authenticated, UserController.patch)

  .use('/', UserPlan);

export default router;
