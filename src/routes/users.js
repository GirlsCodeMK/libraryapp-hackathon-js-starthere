import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import { User } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();
// Fields people are permitted to modify using the edit form.
const permittedParams = ['email', 'role'];

// Sign up form
router.get('/new', (req, res) => {
  res.render('users/new', {user: null, error: null});
});

// View user record
router.get('/:id', ensureLoggedIn(), catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.render('users/edit', {user, error: null});
}));

// View all users
router.get('/', ensureLoggedIn(), catchAsync(async (req, res) => {
  const users = await User.findAll({});
  if(req.user.role == 'Borrower') {
	  res.redirect('/');
  } else {
  	res.render('users/index', {users});
  }
}));

// Update a user
router.post('/:id', ensureLoggedIn(), catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }

  permittedParams.forEach((field) => user[field] = req.body[field]);

  try {
    await user.save();
    req.flash('info', 'User updated successfully');
    res.redirect('/admin/users');
  } catch(e) {
    console.warn(e);
    res.render('users/edit', {user, error: e.toString()});
  }
}));

// Create a user (sign up)
router.post('/', catchAsync(async (req, res) => {
  // I don't use the same permittedParams trick as Books here because we'd
  // need to permit encryptedPassword in order for it to send the field to
  // the DB. This is a bit weird on Sequelize's part.
  const user = new User({
    email: req.body.email,
    role: "Borrower",
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
