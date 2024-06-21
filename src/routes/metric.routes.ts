import Router from 'express';
import MetricController from '../controllers/metric';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, MetricController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, MetricController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    MetricController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    MetricController.patch
  )
  .delete(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    MetricController.delete
  );

export default router;
