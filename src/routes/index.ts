import Router from 'express';
import response from '../middlewares/extended-reponse.middleware';
import authentication from './authentication.routes';
import roles from './role.routes';
import users from './user.routes';
import metricTypes from './metricsType.routes';
import metrics from './metric.routes';
import trainingPlan from './trainingPlan.routes';
import userPlan from './userPlan.routes';

const router = Router();

router.use(response);
router.use('/', authentication);
router.use('/roles', roles);
router.use('/users', users);
router.use('/metricTypes', metricTypes);
router.use('/metrics', metrics);
router.use('/plans', trainingPlan);
router.use('/userPlan', userPlan);
export default router;
