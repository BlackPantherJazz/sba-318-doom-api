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

export default router;