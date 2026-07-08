import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService.js';
import { AppError } from '../errors/AppError.js';

const productService = new ProductService();

export class ProductController {
  index = async (req: Request, res: Response) => {
    const products = await productService.listAll();
    return res.json(products);
  };

  store = async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    const product = await productService.create({
      name,
      description,
      price,
      stock,
    });

    return res.status(201).json(product);
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id || req.body.id;
    const { name, description, price, stock } = req.body;

    if (!id) {
      throw new AppError('O ID do produto é obrigatório', 400);
    }

    const product = await productService.update(id, {
      name,
      description,
      price,
      stock,
    });

    return res.json(product);
  };
}