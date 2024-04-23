import Router from 'express';
import MachineController from '../controllers/machine';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, MachineController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, MachineController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    MachineController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    MachineController.patch
  );

export default router;
