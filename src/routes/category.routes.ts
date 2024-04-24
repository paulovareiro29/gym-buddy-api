import Router from 'express';
import CategoryController from '../controllers/category';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, CategoryController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, CategoryController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    CategoryController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    CategoryController.patch
  );

export default router;
