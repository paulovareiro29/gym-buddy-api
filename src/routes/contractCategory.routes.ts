import Router from 'express';
import ContractCategoryController from '../controllers/contractCategories';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, ContractCategoryController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, ContractCategoryController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    ContractCategoryController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    ContractCategoryController.patch
  );

export default router;
