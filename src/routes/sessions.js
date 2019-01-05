import { Router } from 'express';
import passport from 'passport';

import catchAsync from '../lib/catchAsync';

const router = Router();

// Create a session (sign in)
router.post('/', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  catchAsync(async (req, res) => {
    res.send(req.user);
  })
);

export default router;
