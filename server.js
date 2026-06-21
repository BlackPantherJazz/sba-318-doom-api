import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import albumsRouter from './routes/albums.js'
import aliasRouter from  './routes/aliases.js'
import reviewsRouter from './routes/reviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

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
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found. ALL CAPS when you spell the man name'});
});

// Start Server
app.listen(PORT, () => {
    console.log(`DOOM server running on http://localhost:${PORT}`);

}
);

