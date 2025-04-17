import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getMyOrders
} from '../controllers/order.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin'), getOrders)
  .post(createOrder);

router.get('/my-orders', getMyOrders);

router
  .route('/:id')
  .get(getOrder)
  .put(authorize('admin'), updateOrderStatus);

export default router; 