const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

//set routes for api this gets notes saved in db.json
router.get('/notes', (req, res) => {
    const notes = fs.readFile("../db/db.json", "utf8");
    const notesArr = JSON.parse(notes);
    res.json(notesArr);
});

// function post new notes to to db.json
router.post('/notes', (req, res) => {
    console.log(req.body);
    // req.body.id = uuid();    
    const notes = fs.readFile("./db/db.json", "utf8");
    const notesArr = JSON.parse(notes);
    console.log(req.body);
    const notesObj = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    const newNotesArr = notesArr.concat(notesObj);
    console.log(newNotesArr);
    const revisedArr = fs.writeFileSync("./db/db.json", JSON.stringify(newNotesArr))
    res.json(revisedArr);
});


module.exports = router