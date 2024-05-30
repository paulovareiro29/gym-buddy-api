import Router from 'express';
import MetricTypesController from '../controllers/metricTypes';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, MetricTypesController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, MetricTypesController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    MetricTypesController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    MetricTypesController.patch
  )
  .delete(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    MetricTypesController.delete
  );

export default router;
