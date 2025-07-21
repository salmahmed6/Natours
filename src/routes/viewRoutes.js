const express = require('express');


const router =  express.Router();

// 3- Routes
router.get('/', (req, res) => {
    res.status(200).render('base', {
        tour: 'The Forest Hiker',
        user: 'Salma'
    });
})

router.get('/overview', );

router.get('/tour', (req, res) => {
    res.status(200).render('tour' , {
        title: 'The Forest Hiker Tour',
    });
});


module.exports = router;