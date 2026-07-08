import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/AppError.js';

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export class ProductService {
  async listAll() {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return products.map(product => ({
      ...product,
      price: Number(product.price),
    }));
  }

  async create({ name, description, price, stock }: CreateProductData) {
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
      data: { name, description: description ?? null, price, stock }
    });

    return {
      ...product,
      price: Number(product.price),
    };
  }

  async update(id: string, { name, description, price, stock }: CreateProductData) {
  const productExists = await prisma.product.findUnique({
    where: { id }
  });

  if (!productExists) {
    throw new AppError('Produto não encontrado', 404);
  }

  if (price <= 0) throw new AppError('O preço deve ser maior que zero');
  if (stock < 0) throw new AppError('O estoque não pode ser negativo');

  const product = await prisma.product.update({
    where: { id },
    data: { name, description: description ?? null, price, stock }
  });

  return product;
}
}