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

// PATCH (update) an album
router.patch('/:id', (req, res) => {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ error: 'Album not found' });
  }

  const { title, aliasId, year, genre, tracks, rating } = req.body;

  if (title) album.title = title;
  if (aliasId) album.aliasId = aliasId;
  if (year) album.year = year;
  if (genre) album.genre = genre;
  if (tracks) album.tracks = tracks;
  if (rating) album.rating = rating;

  res.json(album);
});

// DELETE an album
router.delete('/:id', (req, res) => {
  const index = albums.findIndex((a) => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Album not found' });
  }

  const deleted = albums.splice(index, 1);
  res.json({ message: 'Album deleted', album: deleted[0] });
});

export default router;