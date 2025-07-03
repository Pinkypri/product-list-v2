// app.js
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Product API Server is running!' });
});

app.use('/api/products', productRoutes);

export default app;
