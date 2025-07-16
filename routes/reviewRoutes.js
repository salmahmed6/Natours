const express = require('express');
const reviewController = require('./../controllers/reviewController.js');
const authController = require('./../controllers/authController.js');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview
    );


module.exports = router;