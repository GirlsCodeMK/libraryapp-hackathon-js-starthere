import { Router } from 'express';
import { User } from '../models';
import catchAsync from '../lib/catchAsync';

const router = Router();

// Create a user (sign up)
router.post('/', catchAsync(async (req, res) => {
  try {
    // I don't use the same permittedParams trick as Books here because we'd
    // need to permit encryptedPassword in order for it to send the field to
    // the DB. This is a bit weird on Sequelize's part.
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.json(user);
  } catch(e) {
    console.warn(e);
    res.status(400).send(e.toString());
  }
}));

export default router;
