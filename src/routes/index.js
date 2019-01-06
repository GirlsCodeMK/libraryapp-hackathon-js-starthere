import { Router } from 'express';

import books from './books';
import users from './users';
import sessions from './sessions';
import loans from './loans';

const router = Router();

router.use('/books', books);
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/loans', loans);

router.get('/', (req, res) => {
  res.render('index');
});

export default router;
