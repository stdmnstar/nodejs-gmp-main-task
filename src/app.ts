// import express, { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { reqLogger } from './middleware/req-logger';
import { loginRouter } from './routes/login';
import { usersRouter } from './routes/users';
import { groupsRouter } from './routes/groups';
import { errorHandler } from './middleware/error-handler';
import { authorization } from './middleware/authorization';

const app = express();
app.use(cors());

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(reqLogger);
app.use('/login', loginRouter);
app.use(authorization);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(errorHandler);

// uncaughtException and unhandledRejection implemented in logger.ts, lines 50-55

// process
//     .on('unhandledRejection', (reason, promise) => {
//         logger.error(`${reason} Unhandled Rejection at Promise ${promise}`);
//     })
//     .on('uncaughtException', (err) => {
//         logger.error(`${err} Uncaught Exception thrown`);
//         process.exit(1);
//     });

export default app;
