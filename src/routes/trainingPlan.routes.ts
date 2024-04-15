import Router from 'express';
import TrainingPlanController from '../controllers/trainingPlan';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, TrainingPlanController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, TrainingPlanController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    TrainingPlanController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    TrainingPlanController.patch
  );

export default router;