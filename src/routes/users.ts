import { Router } from 'express';
import { userSchema } from '../validation/schema';
import { validateSchema } from '../middleware/validation';
import usersController from '../controllers/users';

export const usersRouter = Router();

usersRouter
    .get('/', usersController.getAll)
    .get('/:id', usersController.getById)
    .post('/', validateSchema(userSchema), usersController.create)
    .put('/:id', validateSchema(userSchema), usersController.update)
    .delete('/:id', usersController.remove);
