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

router.delete('/', (req, res) => {
  req.logout();
  res.status(204).send();
});

export default router;
