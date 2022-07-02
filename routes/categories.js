const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");



router.get("/", (request, response, next) => {
    Category.find({}, (error, categories) => {
        if(error) return next(error);
        if(categories) {
            console.log(categories);
            return response.json(categories);
        } else {
            return response.status(404).send("Not found.");
        }
    });
}); 

module.exports = router;