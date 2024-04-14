import Router from 'express';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';
import RoleController from '../controllers/role';

const router = Router();

router
  .get(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    RoleController.getAll
  )
  .get(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    RoleController.find
  );

export default router;
