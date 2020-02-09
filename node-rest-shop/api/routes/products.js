const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});
const fileFilter = function(req, file, cb) {
    var type = file.mimetype;
    if (type == 'image/jpeg' || type[0] == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

const ProductsController = require('../controllers/products')

router.get('/', ProductsController.products_GetAll);
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_CreateProduct);
router.get('/:productId', ProductsController.products_GetProduct);
router.patch('/:productId', checkAuth, ProductsController.products_UpdateProduct);
router.delete('/:productId', checkAuth, ProductsController.products_DeleteProduct);

module.exports = router;