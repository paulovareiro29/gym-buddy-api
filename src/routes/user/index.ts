import Router from 'express';
import UserController from '../../controllers/user';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import plans from './plan.routes';
const router = Router();

router
  .use('/', plans)
  .get('/', AuthenticationMiddleware.authenticated, UserController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserController.find)
  .get('/:id/statistics', AuthenticationMiddleware.authenticated, UserController.getStatistics)
  .put('/:id', AuthenticationMiddleware.authenticated, UserController.patch)
  .delete(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    UserController.delete
  );
export default router;
