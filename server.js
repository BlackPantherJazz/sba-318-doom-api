import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import albumsRouter from './routes/albums.js'
import aliasRouter from  './routes/aliases.js'
import reviewsRouter from './routes/reviews.js';

import logger from './middleware/logger.js';
import validator from './middleware/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(logger);
app.use(validator);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/albums', albumsRouter);
app.use('/api/aliases', aliasRouter);
app.use("/api/reviews", reviewsRouter);

// Home Route
app.get('/', (req, res) => {
    res.render('home', {title: 'MF DOOM API' });
});

// 404 handler
// 404 handler
app.use((req, res, next) => {
  const error = new Error('Route not found. ALL CAPS when you spell the man name.');
  error.status = 404;
  next(error);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong on the server.'
  });
});

// Start Server
app.listen(PORT, () => {
    console.log(`DOOM server running on http://localhost:${PORT}`);

}
);

