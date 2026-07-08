import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler, AppError } from './middlewares/errorHandler.js';
import { prisma } from './lib/prisma.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/test', (req, res) => {
  return res.json({ message: 'Backend Retail Manager rodando!' });
});
app.get('/erro-async', async (req, res) => {
    // Simulando um erro dentro de uma função assíncrona
    throw new AppError('Este erro foi capturado nativamente pelo Express 5!', 418);
});

// Buscar produtos
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return res.json(formattedProducts);
});

// Criar produto
app.post('/products', async (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || typeof name !== 'string') {
    throw new AppError('Name is required and must be a string', 400);
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    throw new AppError('Price is required and must be greater than 0', 400);
  }

  if (stock === undefined || typeof stock !== 'number' || stock < 0) {
    throw new AppError('Stock is required and must be greater than or equal to 0', 400);
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
    },
  });

  return res.status(201).json({
    ...product,
    price: Number(product.price),
  });
});

app.listen(3333, () => {
    console.log('🚀 Server started on http://localhost:3333');
});
  
app.use(errorHandler);


