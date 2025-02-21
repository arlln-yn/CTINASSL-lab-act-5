import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


// CSP and Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'strict-dynamic'"],
      styleSrc: ["'self'", "'https://fonts.googleapis.com'"],
      imgSrc: ["'self'", "data:", "https://smiski.com/e/products/"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
    }
  },
  xContentTypeOptions: true //  Ensures the header is set // Zap alert solved
}));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff"); //  Explicitly set in responses
  next();
});

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.removeHeader('Server');
  next();
});

// Block access to hidden files (e.g., .env, .git, .DS_Store)
app.use((req, res, next) => {
  const hiddenFileRegex = /(^\/\.)|(_darcs|\.bzr|\.hg|BitKeeper|\.git)/;
  if (hiddenFileRegex.test(req.url)) {
    return res.status(403).send('Access Denied');
  }
  next();
});

// CORS Middleware
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Ensure `sitemap.xml` and `robots.txt` are served correctly
app.use('/sitemap.xml', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});


app.use('/robots.txt', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Robots.txt not found");
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
