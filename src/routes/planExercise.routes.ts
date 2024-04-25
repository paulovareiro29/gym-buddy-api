import Router from 'express';
import PlanExerciseController from '../controllers/planExercise';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, PlanExerciseController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, PlanExerciseController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    PlanExerciseController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    PlanExerciseController.patch
  );

export default router;
