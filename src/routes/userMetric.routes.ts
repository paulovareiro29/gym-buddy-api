import Router from 'express';
import UserMetricController from '../controllers/userMetric';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, UserMetricController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserMetricController.find)
  .post('/', AuthenticationMiddleware.authenticated, UserMetricController.create)
  .put('/:id', AuthenticationMiddleware.authenticated, UserMetricController.patch);

export default router;
