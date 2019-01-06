import { Router } from 'express';
import { User } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

// Sign up form
router.get('/new', (req, res) => {
  res.render('users/new', {user: null, error: null});
});

// Create a user (sign up)
router.post('/', catchAsync(async (req, res) => {
  // I don't use the same permittedParams trick as Books here because we'd
  // need to permit encryptedPassword in order for it to send the field to
  // the DB. This is a bit weird on Sequelize's part.
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    // TODO: Also sign the user in.
    req.flash('info', 'Signed up! Now log in');
    res.redirect('/');
  } catch(e) {
    console.warn(e);
    // Re-render the form so the user can correct their
    // mistakes.
    res.render('users/new', {user, error: e});
  }
}));

export default router;
