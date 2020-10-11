const express = require('express')
const router = express.Router();
const mongo = require('mongoose')
const {cardMod} = require('../schema');
const config = require('../config');
//const { Router } = require('express');

const {MONGO_URI}  = config;

const MONGO_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    user: config.MONGO_DB_USER,
    pass: config.MONGO_DB_PASS
};

mongo.connect(MONGO_URI, MONGO_CONFIG)
    .then(() => console.log('Connected'))
    .catch(() => console.log('Error'));

//READ ALL
router.get('/getAll', function(req, res){
    cardMod.find()
        .then(cards => {
            res.send(cards);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err._message);
        })
    
})

//READ
router.get('/getpokemon/:pokeName', function (req, res) {
    let pokeName = req.params.pokeName;
    cardMod.find({_id: pokeName})
        .then(card => {
            res.send(card)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err._message);
        })
})
  
//CREATE
router.post('/create', function(req, res){

    let {item, id, power, rare} = req.body;
    let card = new cardMod({
        Item: item,
        ID: id,
        Power: power,
        Rarenes: rare
    });

    card.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(500).send(err._message);
        });

});

//DELETE
router.delete('/:id', function(req, res) {
    let pokeName = req.params.pokeName;
    cardMod.findByIdAndDelete(pokeName)
        .then(doc => {
            res.send("DELETED");
        })
        .catch(err => {
            res.status(404).send('NOT FOUND')
        });
});

//UPDATE
router.put('/:id',function(req,res){
    let pokeName = req.params.pokeName;
    let {item, id, power, rare} = req.body;
    let updated = {};
    if (item) updated.Item = item;
    if (id) updated.ID = id;
    if (power) updated.Power = power;
    if (rare) updated.Rarenes = rare;
    cardMod.findAndUpdate(id, updated,{
        new: true,
        runValidators: true
    })
        .then(card => {
            res.send(card);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err._message);
        });
});

module.exports = router;