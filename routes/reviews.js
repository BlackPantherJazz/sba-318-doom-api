import { Router } from 'express';
import reviews from '../data/reviews.js';

const router = Router();

// GET all reviews (with optional albumId filter)
router.get('/', (req, res) => {
    const { albumId } = req.query;

    let results = reviews;

    if (albumId) {
        results = results.filter(
            (review) => review.albumId === Number(albumId)
        );
    }

    res.json(results);
});

// GET single review by Id
router.get('/:id', (req, res) => {
    const review = reviews.find((r) => r.id === Number(req.params.id));

    if(!review) {
        return res.status(404).json({ error: 'Review not found'});
    }

    res.json(review);
});

// POST a new review
router.post('/', (req, res) => {
  const { albumId, username, rating, comment } = req.body;

  if (!albumId || !username || !rating) {
    return res.status(400).json({ error: 'albumId, username, and rating are required.' });
  }

  const newReview = {
    id: reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1,
    albumId,
    username,
    rating,
    comment: comment || '',
    date: new Date().toISOString().split('T')[0]
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// PATCH a review
router.patch('/:id', (req, res) => {
  const review = reviews.find((r) => r.id === Number(req.params.id));

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const { username, rating, comment } = req.body;

  if (username) review.username = username;
  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  res.json(review);
});

// DELETE a review
router.delete('/:id', (req, res) => {
  const index = reviews.findIndex((r) => r.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const deleted = reviews.splice(index, 1);
  res.json({ message: 'Review deleted', review: deleted[0] });
});

export default router;