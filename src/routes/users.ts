import { Router } from 'express';
import { userSchema } from '../validator/schema';
import { createValidator } from 'express-joi-validation';
import usersController from '../controllers/users';

export const usersRouter = Router();
const validator = createValidator();

usersRouter
    .get('/', usersController.getAll)
    .get('/:id', usersController.getById)
    .post('/', validator.body(userSchema), usersController.create)
    .put('/', validator.body(userSchema), usersController.update)
    .delete('/:id', usersController.remove);
