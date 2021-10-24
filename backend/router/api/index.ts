import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('api path');
});

export default router;
