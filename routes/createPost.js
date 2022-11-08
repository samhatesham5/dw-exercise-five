const express = require('express');
const router = express.Router();

//Middleware that is specific to this router
//_ = if you're not using a parameter in js, you can use this
router.use((_,_,next) => {
    next();
});

router.get("/", (req,res) => {
    res.send("hi");
});


modeule.exports = router; 