// import express, { Request, Response, NextFunction } from 'express';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { usersRouter } from './routes/users';
import { groupsRouter } from './routes/groups';
import { errorHandler } from './middleware/error-handler';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(errorHandler);

export default app;
