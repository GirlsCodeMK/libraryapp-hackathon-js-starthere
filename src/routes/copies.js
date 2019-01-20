import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import { Book, Copy } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

// TODO: See index.js
const env = process.env.NODE_ENV || 'development';

const defaultLoanDuration = require('../config')[env].defaultLoanDuration;

// TODO: These all need to be HTML-ified.
router.get('/',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    // Fetch copies information for the books.
    const copies = await req.user.getCopies({
      where: {
        returned: false
      },
      include: [{
        model: Copy
      }]
    });
    res.render('copies/index', {copies});
  })
);

router.post('/',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    const {CopyId} = req.body;

    // Insert copyAcquisitionDate
    const copyAcquisitionDate =

    // Insert copyNumber
    const copyNumber =

    // TODO: Could use moment or similar here instead.
    dueDate.setTime(dueDate.getTime() + defaultLoanDuration * 86400000);

    const loan = await req.user.createCopy({BookId, dueDate});
    req.flash('info', "Copy created.");
    res.redirect('/copies');
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
      req.flash('info', 'Book copy returned');
    } catch(e) {
      console.warn(e);
      req.flash('alert', e.toString());
    }
    res.redirect('/loans');
  })
);

export default router;
