import Router from 'express';
import TrainingPlanController from '../../controllers/trainingPlan';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import planExercise from './exercise.routes';

const router = Router();

router
  .use('/', planExercise)
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
  )
  .delete(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer', 'admin']),
    TrainingPlanController.delete
  );

export default router;
