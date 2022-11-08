const express = require('express');
const router = express.Router();

//Creating the form for this post
const createPostForm = `
<h1> Create Post </h1> 
<form action = "">
    <input type="text" name ="title" placeholder="Title" />
    <input type="text" name ="title" placeholder="Title" />
    <input type="text" name ="title" placeholder="Title" />
    <button type="submit">Submit</button>
</form>`; 

//Middleware that is specific to this router
//_ = if you're not using a parameter in js, you can use this
router.use((req,res,next) => {
    next();
});

router.get("/", (req,res) => {
    res.send(createPostForm);
});


module.exports = router; 