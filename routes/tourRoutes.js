const express = require('express');
const tourController = require('./../controllers/tourController');
const catchAsync = require('./../utils/catchAsync');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

//create a checkbody middleware
//check if body contains the name and price property
//if not, send back 400(bad request)
//add it to the post handler stack

router
  .route('/top-5-cheap')
  .get(
    catchAsync(tourController.aliasTopTours),
    catchAsync(tourController.getAllTours)
  );

router.route('/tour-status').get(tourController.getTourStatus);
router
  .route('/monthly-plan/:year')
  .get(catchAsync(tourController.getMonthlyPlan));

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
