const express = require('express');
const router = express.Router();

//Initalizing firestore (cloud database for firebase)
const firestore = require("firebase/firestore");

//Creating a reference to the database
const db = firestore.getFirestore(); 

//Creating the form for this post
 //The action that submitting the form does (In this case, redirects to the subnit page)
const createPostForm = `
<h1> Create Post </h1> 
 <form action = "/create/submit">  
 <div style = "display: flex; flex-direction: column; max-width: 400px;">         
        <input type="text" name ="postTitle" placeholder="Title" style="margin-bottom: 20px;"/>
        <input type="text" name ="postText" placeholder="Text" style="margin-bottom: 20px;"/>
        <input type="text" name ="postAuthor" placeholder="Author" style="margin-bottom: 20px;"/>
        <button type="submit">Submit</button>
    </div> 
</form>
`; 

//Middleware that is specific to this router
//_ = if you're not using a parameter in js, you can use this
router.use((req,res,next) => {
    next();
});

router.get("/", (req,res) => {
    res.send(createPostForm);
});

//10 - Setting up a post request to firestore, send values to firestore, and then redirect to another page
router.get("/submit", (req,res) => {
    //Sometimes you wanna be more specific when naming variables to avoid potential effects
    const queryParams = req.query;
    const title = queryParams.postTitle;
    const text = queryParams.postText;
    const author = queryParams.postAuthor; 

    //Creating an id from the title by replacing the spaces with a dash and set to lowercase
    const idFromTitle = title.replace(/\s+/g, "-").toLowerCase(); 

    //Submit the post to firebase (setDoc takes two arguments here 1- value of doc and 2- object)
    const setBlogPost = firestore.setDoc(
        //database (db), name of collection in firebase (posts), and postId
        firestore.doc(db, "posts", idFromTitle), {title:title, text:text, author:author,});

    //Call function async
    setBlogPost
    .then((response) => {
        //If we successful, send this back to the browser
        res.send(`
            <h1>Success!</h1>
            <p><a href="/create">Submit another post</a></p>
            <p><a href="/">Return home</a></p>
        `);
    })
    .catch((error) => {
        console.warn(error);
        res.send(`Error submitting: ${error.toString()}`); 

    })
});



module.exports = router; 