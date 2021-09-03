const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

//set routes for api this gets notes saved in db.json
router.get('/notes', (req, res) => {
    fs.readFile("../db/db.json", (err, data) => {
        if (err) throw err;
        res.status(201).send(data);
    })
})

// function post new notes to to db.json
router.post('/notes', (req, res) => {
    console.log(req.body);
    // req.body.id = uuid();    
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        req.body.id = uuidv4();
        fs.writeFile("./db/db.json", JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log("Saved!");
            res.send(req.body)

        })

    })
})
module.exports = router