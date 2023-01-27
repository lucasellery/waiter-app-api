import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb'));
