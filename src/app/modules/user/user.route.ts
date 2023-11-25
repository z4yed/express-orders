import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// user crud routes
router.get('/', UserController.getUsersList);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// order management routes
router.get('/:userId/orders', UserController.getOrders);
router.put('/:userId/orders', UserController.addOrder);
router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const UserRoutes = router;
