import express from 'express';
import cors from 'cors';
import { errorHandler, AppError } from './middlewares/errorHandler.js';

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
app.listen(3333, () => {
    console.log('🚀 Server started on http://localhost:3333');
});
  
app.use(errorHandler);

