import Router from 'express';
import UserController from '../controllers/user';

const router = Router();

router
  .get('/', UserController.getAll)
  .get('/:id', UserController.find)
  .post('/', UserController.create)
  .put('/:id', UserController.patch);

export default router;
