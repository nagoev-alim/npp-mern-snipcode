import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import 'colors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

import { config } from './config/index.js';
import { errorMiddleware } from './middleware/index.js';
import router from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* =============================
📦 App Settings
============================= */
const app = express();

/* =============================
📦 Middleware
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* =============================
📦 Routes
============================= */
app.use('/api', router);

/* =============================
📦 Production Configuration
============================= */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'dist', 'index.html'),
    ),
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

/* =============================
📦 Error Handler Middleware
============================= */
app.use(errorMiddleware);

/* =============================
📦 Listen Port
============================= */
const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(config.mongo.uri);
    app.listen(config.port, () => console.log(`🚀 Listening on port: ${config.port.bold.green}`));
    console.log(`📦 Mongoose Connected to: ${conn.connection.host.bold.green}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();

