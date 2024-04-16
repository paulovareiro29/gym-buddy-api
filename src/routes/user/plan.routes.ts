import Router from 'express';
import UserPlanController from '../../controllers/user/plan';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';

const router = Router();

router
  .get('/:user_id/plans', AuthenticationMiddleware.authenticated, UserPlanController.getAll)
  .get('/:user_id/plans/:plan_id', AuthenticationMiddleware.authenticated, UserPlanController.find)
  .post(
    '/:user_id/plans',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    UserPlanController.create
  )
  .put(
    '/:user_id/plans/:plan_id',
    AuthenticationMiddleware.authenticated,
    AuthenticationMiddleware.authorized(['trainer']),
    UserPlanController.patch
  );

export default router;
