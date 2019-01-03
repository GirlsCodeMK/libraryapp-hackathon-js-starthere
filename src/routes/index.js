import { Router } from 'express';

import books from './books';
import users from './users';
import sessions from './sessions';

const router = Router();

router.use('/books', books);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
