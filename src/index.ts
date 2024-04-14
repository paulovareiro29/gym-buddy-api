import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import loadCoreData from './lib/core/load-core-data';

loadCoreData();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port ${process.env.SERVER_PORT}`)
);

export default app;
