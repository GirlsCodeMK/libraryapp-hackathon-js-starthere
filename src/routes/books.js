import { Router } from 'express';
import { Book } from '../models';
import catchAsync from '../lib/catchAsync';
import { pick } from 'lodash';

const router = Router();

// Fields people are permitted to modify using the API.
const permittedParams = ['title', 'author'];

// View all books
router.get('/', catchAsync(async (req, res) => {
  const books = await Book.findAll({});
  res.render('books/index', {books: books});
}));

// Create a book. Supply fields in the JSON request body.
router.post('/', catchAsync(async (req, res) => {
  try {
    const book = await Book.create(req.body, {fields: permittedParams});
    req.flash('info', 'Book created');
  } catch(e) {
    console.warn(e);
    req.flash('alert', e.toString());
  }
  res.redirect('/books');
}));

// Get a single book by ID.
router.get('/:id', catchAsync(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
  } catch(e) {
    console.warn(e);
    res.status(400).send(e.toString());
  }
}));

// Update a book by ID. Supply fields in the same way as creating a book.
//
// Will return a 404 if no book matches the ID provided.
router.patch('/:id', catchAsync(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send('Not found');
    }
    permittedParams.forEach((field) => book[field] = req.body[field]);
    book.save();
    res.json(book);
  } catch(e) {
    console.warn(e);
    res.status(400).send(e.toString());
  }
}));

// Delete book by ID. Will return 404 if book isn't found.
router.delete('/:id', catchAsync(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send('Not found');
    }
    book.destroy();
    res.status(204).send();
  } catch(e) {
    console.warn(e);
    res.status(400).send(e.toString());
  }
}));

export default router;
