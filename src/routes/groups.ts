import { Router } from 'express';
// import { userSchema } from '../validation/schema';
// import { validateSchema } from '../middleware/validation';
import groupsController from '../controllers/groups';

export const groupsRouter = Router();

groupsRouter
    .get('/', groupsController.getAll)
    .get('/:id', groupsController.getById)
    .post('/', groupsController.create)
    .put('/:id', groupsController.update)
    .delete('/:id', groupsController.remove);
