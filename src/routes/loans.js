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
    const loans = await req.user.getLoans();
    res.json(loans);
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
    res.json(loan);
  })
);

export default router;
