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

  // For each book, calculate if it's on loan. These are async DB
  // queries so we need to run them all before rendering the template.
  await Promise.all(books.map(async (book) => book.onLoan = await book.getOnLoan()));

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
// TODO: Should render HTML, not return JSON.
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
// TODO: Should render HTML, not return JSON.
//
// Will return a 404 if no book matches the ID provided.
router.patch('/:id', catchAsync(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send('Not found');
    }
    permittedParams.forEach((field) => book[field] = req.body[field]);
    await book.save();
    res.json(book);
  } catch(e) {
    console.warn(e);
    res.status(400).send(e.toString());
  }
}));

// Delete book by ID. Will return 404 if book isn't found.
//
// TODO: Should render HTML, not return JSON.
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
