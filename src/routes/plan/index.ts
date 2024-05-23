import Router from 'express';
import TrainingPlanController from '../../controllers/trainingPlan';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import planExercise from './exercise.routes';

const router = Router();

router
  .use('/', planExercise)
  .get('/', AuthenticationMiddleware.authenticated, TrainingPlanController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, TrainingPlanController.find)
  .get('/creatorId/:creatorId', AuthenticationMiddleware.authenticated, TrainingPlanController.findByCreator)
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
