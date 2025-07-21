const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router =  express.Router();

// 3- Routes
router.get('/', (req, res) => {
    res.status(200).render('base', {
        tour: 'The Forest Hiker',
        user: 'Salma'
    });
})

router.get('/overview', viewsController.getOverview );

router.get('/tour', viewsController.getTour );


module.exports = router;