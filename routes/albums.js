import { Router } from 'express';
import albums from '../data/albums.js';

const router = Router();

// GET all albums
router.get('/', (req, res) => {
  const { genre, year } = req.query;

  let results = albums;

  if (genre) {
    results = results.filter(
      (album) => album.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (year) {
    results = results.filter(
      (album) => album.year === Number(year)
    );
  }

  res.json(results);
});

// GET single album by id
router.get('/:id', (req, res) => {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ error: 'Album not found' });
  }

  res.json(album);
});

export default router;