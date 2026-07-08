import { Router } from 'express';
import { ProductController } from './controllers/ProductController.js';
import { AppError } from './errors/AppError.js';

const routes = Router();
const productController = new ProductController();

// Test routes
routes.get('/test', (req, res) => {
  return res.json({ message: 'Backend Retail Manager rodando!' });
});

routes.get('/erro-async', async (req, res) => {
  throw new AppError('Este erro foi capturado nativamente pelo Express 5!', 418);
});

// Product routes
routes.get('/products', productController.index);
routes.post('/products', productController.store);

export { routes };
