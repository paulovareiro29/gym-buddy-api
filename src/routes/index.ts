import Router from 'express';
import response from '../middlewares/extended-reponse.middleware';
import authentication from './authentication.routes';
import users from './user.routes';
import metricTypes from './metricsType.routes';
import metrics from './metric.routes';

const router = Router();

router.use(response);
router.use('/', authentication);
router.use('/users', users);
router.use('/metricTypes', metricTypes);
router.use('/metrics', metrics);

export default router;
