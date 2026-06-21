import { Router } from 'express';
import aliases from '../data/aliases.js';

const router = Router();

// GET all aliases (with optional active filter)
router.get('/', (req, res) => {
    const { active } = req.query;

    let results = aliases;

    if (active !== undefined) {
        results = results.filter (
            (alias) => alias.active === (active === 'true')

        );
    }

    res.json(results);
});

// GET single alias by id
router.get('/:id', (req, res) => {
    const alias = aliases.find((a) => a.id === Number(req.params.id));

    if(!alias) {
        return res.status(404).json({ error: 'Alias not found behind the mask.'});
    }

    res.json(alias);
});

export default router;