const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");


let recipes = [];

router.get("/:food", (request, response, next) => {
    const name = request.params.food;
    Recipe.find({name: new RegExp(name, "i")}, (error, recipes) => {
        if(error) return next(error);
        if(recipes.length > 0) {
            console.log(recipes);
            return response.send(recipes[0]);
        } else{
            return response.status(404).send("There is no recipe including " + name);
        }
    })
}); 



/*let food = request.params.food;
    response.json({
        name: food, 
        instructions: [`tee ${food}`, `tee lisää ${food}`], 
        ingredients: [`${food}-ainekset`, `lisää ${food}-aineksia`]
    });*/



router.post("/", (request, response, next) => {
    Recipe.findOne({name: request.body.name}, (error, recipe) => {
        if(error) return next(error);
        if(!recipe) {
            new Recipe({
                name: request.body.name,
                instructions: request.body.instructions,
                ingredients: request.body.ingredients,
                categories: request.body.categories
            }).save((error) => {
                if(error) return next(error);
                return response.send(request.body);
            });
        } else {
            return response.status(403).send("Already has that recipe!")
        }
    });

});






module.exports = router;