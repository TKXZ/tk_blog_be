import express, { Express } from 'express';
import process from 'node:process';

import cors from './middleware/cors';

import sequelize from './db';
// import { syncDatabaseTable } from './model/sync';

import articleRouter from './routes/article';


process.on('exit', () => {
  if (sequelize) {
    sequelize.close();
  }
  console.log('程序退出')
})

const app: Express = express();
app.use(cors);
app.use(express.json());

app.use('/article', articleRouter);

app.listen(3636, () => {
  console.log('服务启动成功');
})

// syncDatabaseTable();