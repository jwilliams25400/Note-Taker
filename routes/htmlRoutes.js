const path = require("path");
const router = require("express").Router();

//Get route to return notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Get routes to return index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// if there is no route matching, resend to homepage
router.get("*", (req, res) => {
    res.sendfile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
