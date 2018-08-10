var express = require('express');
var router = express.Router();
var Ninja = require('../models/ninja');

router.get('/ninjas',function(req, res, next){
   /*Ninja.find({}).then(function(ninjas){
       res.send(ninjas);
   })*/
   Ninja.aggregate().near(
       { 
        geoNear:"Store",
        near: { 'type': 'Point', 'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)] }, 
        maxDistance: 100000, 
        spherical: true, 
        distanceField: "dis" }).then(function(ninjas){
        res.send(ninjas);
    });

    
});



router.post('/ninjas',function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
   
});

router.put('/ninjas/:id',function(req, res){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        })
       
    });
});

router.delete('/ninjas/:id',function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});



module.exports = router;