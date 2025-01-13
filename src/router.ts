import path from 'node:path';
import { Router } from 'express';
import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import multer from 'multer';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { listTable } from './app/useCases/tables/listTables';
import { createTable } from './app/useCases/tables/createTable';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

// list categories
router.get('/categories', listCategories)

// create category
router.post('/categories', createCategory)

// list categories
router.get('/tables', listTable)

// create category
router.post('/tables', createTable)

// list products
router.get('/products', listProducts)

// create products
router.post('/products', upload.single('image'), createProduct)

// lists products by category
router.get('/categories/:categoryId/products', listProductsByCategory)

// list orders
router.get('/orders', listOrders)

// create order
router.post('/orders', createOrder)

// change order status
router.patch('/orders/:orderId', changeOrderStatus)

// cancel order
router.delete('/orders/:orderId', cancelOrder)