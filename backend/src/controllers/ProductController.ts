import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService.js';

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
}