function get_pokemon (id, name, weight, height, base_experience) {
    return `<li class="added-item"><img class = "img"> 
            Pokemon: ${name} 
            ID: ${id} 
            Weight:<span class="pokeWeight"> ${weight}</span> 
            Height: ${height} 
            Base experience ${base_experience} 
            Types: ${typeNames}  
            <button class="remove-item">remove</button></li>`
}

function get_card (id, name, Power, rare ) {
    return `<li class="added-item"><img class = "img"> 
            Itwm: ${name} 
            ID: ${id} 
            Power:<span class="pokeWeight"> ${Power}</span> 
            Rareness: ${rare} 
            <button class="remove-item">remove</button></li>`
}

const express = require('express')
const axios = require("axios")
const app = express()
const cors = require('cors') 
const fs  = require('fs');
//const par = require('body-parser');
const bodyParser = require('body-parser')
var data = fs.readFileSync(cards.json)
var cards = JSON.parse(data)
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended = false}));
app.use(bodyParser.json());

app.post('/create/:item/:id/:power/:rare', function(req, res){

    cards[req.body.item] = get_card(  req.body.id,
                                        req.body.item,
                                        req.body.power,
                                        req.body.rare)
    var data2 = JSON.stringify(cards, null, 2);
    fs.writeFile('cards.json', data2, function(err){
        console.log("created")
    });

});


app.get('/delete/:item', function(req, res){
    delete cards[name];
    var data2 = JSON.stringify(cards, null, 2);
    fs.writeFile('cards.json', data2, function(err){
        console.log("Deleted")
    });
})

app.post('/update/:item/:id/:power/:rare',function(req, res){

    cards[req.body.item] = get_card(    req.body.id,
                                        req.body.item,
                                        req.body.power,
                                        req.body.rare)
    var data2 = JSON.stringify(cards, null, 2);
    fs.writeFile('cards.json', data2, function(err){
        console.log("Updated")
    });

});

app.get('/getAll', function(req, res){
    res.send(cards);
})

  
app.get('/getpokemon/:pokeName', function (req, res) {
    let pokeName = req.params.pokeName;
    //console.log(pokeName)
    if (pokeName.length == 0){
        res.send("Please get a name");
    }
    if (cards[pokeName]){
        res.send(cards[pokeName]);
    }

    axios
    .get('https://pokeapi.co/api/v2/pokemon/' + pokeName)
    .then(function (response) {
        let pokemon = response.data
        //console.log(pokemon);
        cards[pokeName] = get_pokemon(  result.data.id, 
                                        result.data.species.name, 
                                        result.data.weight, 
                                        result.data.sprites.front_default,
                                        result.data.height,
                                        result.data.base_experience);
        res.send(cards[pokeName]);
        //console.log("Inside then");
    })
    .catch(function (error) {
        res.send(error);
        //console.log(error);
        //console.log("Inside catch");
    });
})
  
   
app.listen(3000)