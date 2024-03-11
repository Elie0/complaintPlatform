import express, { Express, Request, Response, NextFunction } from 'express';
import { isAuth } from './middleware/is-auth';
import { isAdmin } from './middleware/checkAdmin';
import complaintCategoryRoute from './routes/complaintCategory';
import clientRoutes from './routes/clientComplaint';
import publicRoutes from './routes/public'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongooseConnect from './db';
import authRoutes from './routes/auth';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

mongooseConnect();

app.use(bodyParser.json());

app.use(publicRoutes)
app.use('/auth', authRoutes);
app.use('/admin',isAuth, isAdmin,complaintCategoryRoute);
app.use('/client',isAuth,clientRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Route Not Found!');
  (error as any).statusCode = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  console.log('reached');
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
