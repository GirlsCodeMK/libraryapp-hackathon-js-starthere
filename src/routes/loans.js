import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import { Book, Loan } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

// TODO: See index.js
const env = process.env.NODE_ENV || 'development';

const defaultLoanDuration = require('../config')[env].defaultLoanDuration;

// TODO: These all need to be HTML-ified.
router.get('/',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    // Fetch loan & book information for the user's unreturned
    // books.
    const loans = await req.user.getLoans({
      where: {
        returned: false
      },
      include: [{
        model: Book
      }]
    });
    res.render('loans/index', {loans});
  })
);

router.post('/',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    const {BookId} = req.body;

    // Calculate due date
    const dueDate = new Date();
    // TODO: Could use moment or similar here instead.
    dueDate.setTime(dueDate.getTime() + defaultLoanDuration * 86400000);

    const loan = await req.user.createLoan({BookId, dueDate});
    req.flash('info', "You've borrowed the book!");
    res.redirect('/loans');
  })
);

// Returning a book by barcode. Will receive a `code` input from the 
// submitted form.
router.post('/return',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    const code = req.body.code;
    // Loan must belong to the current user.
    // Loan must be not returned yet.
    const loan = await Loan.findOne({
      where: {
        UserId: req.user.id,
        returned: false
      },
      include: [{
        model: Book,
        where: { barcode: code }
      }]
    });
    if (!loan) {
      req.flash('alert', "Loan not found");
      return res.redirect('/loans');
    }
    try {
      await loan.return();
      req.flash('info', 'Book returned');
    } catch(e) {
      console.warn(e);
      req.flash('alert', e.toString());
    }
    res.redirect('/loans');
  })
);


// This should be a PUT, but HTML forms don't support PUT.
// Return a book by marking the loan as returned.
router.post('/:id/return',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    const loan = await Loan.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });
    if (!loan) {
      req.flash('alert', "Loan not found");
      return res.redirect('/loans');
    }
    try {
      await loan.return();
      req.flash('info', 'Book returned');
    } catch(e) {
      console.warn(e);
      req.flash('alert', e.toString());
    }
    res.redirect('/loans');
  })
);

export default router;
