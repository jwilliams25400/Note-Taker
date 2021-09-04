const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const readFile = util.promisify(fs.readFile)


//set routes for api this gets notes saved in db.json
router.get('/notes', async(req, res) => {
    const notes = await readFile("./db/db.json", "utf8");
    const notesArr = JSON.parse(notes);
    res.json(notesArr);



    // fs.readFile("../db/db.json", "utf8", function(err, data){
    //     const notesArr = JSON.parse(data);
    //     res.json(notesArr);
    // });
});

// function post new notes to to db.json
router.post('/notes', async(req, res) => {
    console.log(req.body);
    // req.body.id = uuid();    
    const notes = await readFile("./db/db.json", "utf8");
    const notesArr = JSON.parse(notes);
    console.log(req.body);
    const notesObj = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    const newNotesArr = notesArr.concat(notesObj);
    console.log(newNotesArr);
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotesArr))
    res.json(newNotesArr);
});
 // deleting notes using unique id 
 router.delete("/notes/:id", async(req, res) => {
     const notes = JSON.parse (await readFile("./db/db.json", "utf8"));
     const remainNotes = notes.filter((note) => note.id !== req.params.id);
     console.log(remainNotes);
      fs.writeFileSync("./db/db.json", JSON.stringify(remainNotes));
     res.json(remainNotes);
 })


module.exports = router