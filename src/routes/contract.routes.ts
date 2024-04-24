import Router from 'express';
import ContractController from '../controllers/contract';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, ContractController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, ContractController.find)
  .post('/', AuthenticationMiddleware.authenticated, ContractController.create)
  .put('/:id', AuthenticationMiddleware.authenticated, ContractController.patch);

export default router;
