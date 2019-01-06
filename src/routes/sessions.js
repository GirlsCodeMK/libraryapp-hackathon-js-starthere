import { Router } from 'express';
import passport from 'passport';

import catchAsync from '../lib/catchAsync';

const router = Router();

// Sign in form
router.get('/new', (req, res) => {
  res.render('sessions/new');
});

// Create a session (sign in)
router.post('/', 
  passport.authenticate('local', { failureRedirect: '/sessions/new' }),
  catchAsync(async (req, res) => {
    req.flash('info', 'You are now signed in');
    res.redirect('/');
  })
);

// Normally you'd use an HTTP DELETE method here but we'd need to wire our
// logout button to make an AJAX call to do that, TODO.
router.post('/destroy', (req, res) => {
  req.logout();
  req.flash('info', 'You are now signed out');
  res.redirect('/');
});

export default router;
