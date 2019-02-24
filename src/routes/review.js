import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import { Book, Review} from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();
const env = process.env.NODE_ENV || 'development';

router.post('/',
  ensureLoggedIn(),
  catchAsync(async (req, res) => {
    const {BookId, Text, Rating} = req.body;

    const review = await req.user.createReview({BookId, Text, Rating});


    // const loan = await req.user.createLoan({BookId, dueDate});

    res.redirect('/books/'+BookId);
  })
);
export default router;
