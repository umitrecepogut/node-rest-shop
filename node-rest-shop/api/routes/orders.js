const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_GetAll);
router.post('/', checkAuth, OrdersController.orders_CreateOrder);
router.get('/:orderId', checkAuth, OrdersController.orders_GetOrder);
router.delete('/:orderId', checkAuth, OrdersController.orders_DeleteOrder);

module.exports = router;