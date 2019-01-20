import { Router } from 'express';

import books from './books';
import users from './users';
import sessions from './sessions';
import loans from './loans';

import { Book, User } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

router.use('/books', books);
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/loans', loans);

router.get('/login', (req, res) => res.redirect('/sessions/new'));

router.get('/', catchAsync(async (req, res) => {
  const books_count = await Book.count();
  const users_count = await User.count();
  res.render('index', {books_count, users_count});
}));

export default router;
