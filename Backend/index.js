import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Config/Database/db.js';
import { errorHandler } from './Middlewares/ErrorHandler.js';
import router from './Routes/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import validateEnv from './Config/validateEnv.js';
validateEnv();

dotenv.config();
const app = express();
app.use(helmet());

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many request, please try again later' },
});

app.use(limiter);

const allowedOrigins = [
  'https://vyaparsathi-docker-frontend.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', router);

// debug route
app.get('/api/debug', (req, res) => {
  res.json({
    success: true,
    message: "Debug route working — NGINX proxy is correct",
    from: "Backend",
    url: req.originalUrl,
    origin: req.get("origin"),
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

//Centralized Error Handler
app.use(errorHandler);

//Connect Database and Start Server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Backend server started successfully on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
