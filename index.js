import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/db/db.js';
import {ProductRouter} from './src/routes/product.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
connectDB( process.env.DB_USER, process.env.DB_PASS );

app.use('/api', ProductRouter);

app.listen(PORT, ()=>console.log('servidor escuchando en el puerto 3000'));