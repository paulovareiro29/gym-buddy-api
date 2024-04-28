import Router from 'express';
import PlanExerciseController from '../../controllers/trainingPlan/planExercise';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';

const router = Router();

router
  .get(
    '/:plan_id/planExercise',
    AuthenticationMiddleware.authenticated,
    PlanExerciseController.getAll
  )
  .get(
    '/:plan_id/planExercise/:id',
    AuthenticationMiddleware.authenticated,
    PlanExerciseController.find
  )
  .post(
    '/:plan_id/planExercise',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    PlanExerciseController.create
  )
  .put(
    '/:plan_id/planExercise/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    PlanExerciseController.patch
  );

export default router;
