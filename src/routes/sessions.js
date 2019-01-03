import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

// Always use the same error message so you can't tell if the email
// address is invalid or if the password is invalid.
// Find out more on OWASP:
// <https://www.owasp.org/index.php/Testing_for_User_Enumeration_and_Guessable_User_Account_(OWASP-AT-002)>
const errorMessage = 'User not found or password incorrect';

// Create a session (sign in)
router.post('/', catchAsync(async (req, res) => {
  // Find user by email
  const user = await User.findOne({where: {email: req.body.email}});

  // Side note for those interested; there's a timing attack here where 
  // if we don't find a user, the request is faster than if we do.
  // See: https://sempf.net/post/timing-attacks-in-account-enumeration
  // You could solve this by always doing some kind of bcrypt.compare, whether
  // you find a user or not.
  if (!user) { res.status(404).send(errorMessage); }

  // Check password is valid.
  // Why bcrypt.compare? https://www.npmjs.com/package/bcrypt#to-check-a-password
  const validPassword = await bcrypt.compare(req.body.password, user.getDataValue('encryptedPassword'));
  if (!validPassword) { res.status(404).send(errorMessage); }

  // TODO: Sign the user in somehow e.g. by saving a cookie, session variable,
  // sending them a token to use. We could also just use basic auth?
  res.send(user);
}));

export default router;
