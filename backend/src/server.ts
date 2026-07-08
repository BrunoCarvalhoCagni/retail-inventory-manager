import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { routes } from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Register central routes
app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server started on http://localhost:3333');
});
  
app.use(errorHandler);


