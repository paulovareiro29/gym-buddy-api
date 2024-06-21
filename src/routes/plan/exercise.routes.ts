import Router from 'express';
import PlanExerciseController from '../../controllers/trainingPlan/planExercise';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';

const router = Router();

router
  .get('/:plan_id/exercises', AuthenticationMiddleware.authenticated, PlanExerciseController.getAll)
  .get(
    '/:plan_id/exercises/:id',
    AuthenticationMiddleware.authenticated,
    PlanExerciseController.find
  )
  .post(
    '/:plan_id/exercises',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    PlanExerciseController.create
  )
  .put(
    '/:plan_id/exercises/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    PlanExerciseController.patch
  )
  .delete(
    '/:plan_id/exercises/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin', 'trainer']),
    PlanExerciseController.delete
  );

export default router;
