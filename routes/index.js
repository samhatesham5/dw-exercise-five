const express = require('express');
const router = express.Router();


router.use((req,res,next) => {
    console.log("Time", Date.now());
    next();
});

//Getting the homepage, and after getting the response, send Wow!
router.get("/", (req, res) => {
    //We send the request for "Wow" and the server will send this back to us
    res.send("Wow!");
});

//Exporting the router
module.exports = router; 