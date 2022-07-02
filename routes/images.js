const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Image = require("../models/Image");
const multer = require('multer');
const upload = multer();

let recipes = [];


/*router.post("/", (request, response) => {
    recipes.push(request.body);
    response.send(request.body);
});*/


// ########MUOKKAA TÄTÄ
router.post("/", upload.array("images"), (request, response, next) => {
    request.files.forEach((file) => {
        Image.findOne({ name: file.name }, (error, image) => {
            if (error) return next(error);
            if (!image) {
                new Image({
                    name: file.name,
                    encoding: file.encoding,
                    mimetype: file.mimetype,
                    buffer: file.buffer
                }).save((error) => {
                    if (error) return next(error);
                    
                });
            } else {
                return response.status(403).send("Already has that image!")
            }
        });

    });
    response.send(request.files);
});


router.get("/", (request, response, next) => {
    Image.find({}, (error, Images) => {
        if (error) return next(error);
        if (Images) {
            console.log(Images);
            return response.json(Images);
        } else {
            return response.status(404).send("Not found.");
        }
    });
});



module.exports = router;