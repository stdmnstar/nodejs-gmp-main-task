import { Router } from 'express';
import usersGroupController from '../controllers/users-group';

export const usersGroupRouter = Router();

usersGroupRouter.post('/', usersGroupController.create);
