import Router from 'express';
import UserPlanController from '../controllers/userPlan';
import AuthenticationMiddleware from '../middlewares/authentication.middleware';

const router = Router();

router
  .get('/', AuthenticationMiddleware.authenticated, UserPlanController.getAll)
  .get('/:id', AuthenticationMiddleware.authenticated, UserPlanController.find)
  .post(
    '/',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    UserPlanController.create
  )
  .put(
    '/:id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    UserPlanController.patch
  );

export default router;
