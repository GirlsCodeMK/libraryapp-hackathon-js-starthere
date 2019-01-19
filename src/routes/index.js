import { Router } from 'express';

import books from './books';
import users from './users';
import sessions from './sessions';
import loans from './loans';

import { Book, User } from '../models';
import catchAsync from '../lib/catchAsync';
import Sequelize from 'sequelize';

const router = Router();

router.use('/books', books);
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/loans', loans);

router.get('/', catchAsync(async (req, res) => {
  const books_count = await Book.count();
  const users_count = await User.count();
  res.render('index', {books_count, users_count});
}));

router.post('/', catchAsync(async (req, res) => {
  let books;
  try {
    const Op = Sequelize.Op;
    books =
      await Book.findAll({ where:
        {
          [Op.or]: [
            {title:
              {[Op.iLike]: '%'+req.body.q+'%'}
            },
            {author:
              {[Op.iLike]: '%'+req.body.q+'%'}
            }
          ]
        }


        });
  } catch(e) {
    console.warn(e);
    req.flash('alert', e.toString());
  }
  res.render('books/index', {books: books});
}));

export default router;
