import Router from 'express';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';
import RoleController from '../controllers/role';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, RoleController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, RoleController.find);

export default router;
