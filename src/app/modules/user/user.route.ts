import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getUsersList);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUser);

export const UserRoutes = router;
