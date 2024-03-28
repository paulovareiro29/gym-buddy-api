import Router from 'express';

const router = Router();

router.use('/', (request, response) => {
  response.json('Hello world');
});

export default router;
