const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController.js');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.patch('/updateMe', authController.protect, userController.updateMe);
//router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  //.get(userController.getUser)
  .patch(userController.updateUser)


router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('users'),
    reviewController.createReview
  );

module.exports = router;
