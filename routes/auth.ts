import express from 'express';
import { body } from 'express-validator';
import User from '../Schemas/user';
import * as authController from '../controllers/auth';


const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/sendotp',authController.sendOTP)
router.post('/setpassword',authController.updatePasswordWithOtp)
router.post('/verifyotp',authController.verifyOTP)

export default router;
