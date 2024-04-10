import Router from 'express';
import response from '../middlewares/extended-reponse.middleware';
import authentication from './authentication.routes';
import users from './user.routes';
import metricTypes from './metricsType.routes';
const router = Router();

router.use(response);
router.use('/', authentication);
router.use('/users', users);
router.use('/metricTypes', metricTypes);
export default router;
