import { Router } from 'express';
import MetricController from '../../controllers/user/metrics';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';

const router = Router();

router
  .get('/:user_id/metrics/trainerClients', AuthenticationMiddleware.authenticated, MetricController.getNumberOfClients)
  .get('/:user_id/metrics/trainerPlans', AuthenticationMiddleware.authenticated, MetricController.getNumberOfTrainingPlansByTrainer)
  .get('/:user_id/metrics/clientPlans', AuthenticationMiddleware.authenticated, MetricController.getNumberOfTrainingPlansByClient);

export default router;
