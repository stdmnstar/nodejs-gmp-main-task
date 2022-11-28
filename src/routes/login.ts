import { Router } from 'express';
import { loginSchema } from '../validation/schema';
import { validateSchema } from '../middleware/validation';
import loginController from '../controllers/login';

export const loginRouter = Router();

loginRouter
    .post('/', validateSchema(loginSchema), loginController.authorization);

