import Router from 'express';
import ExerciseController from '../controllers/exercise';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, ExerciseController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, ExerciseController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    ExerciseController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    ExerciseController.patch
  )
  .delete(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['admin']),
    ExerciseController.delete
  );

export default router;
