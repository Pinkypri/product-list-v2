// app.js
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Product API Server is running!' });
});

app.use('/api/products', productRoutes);

export default app;
