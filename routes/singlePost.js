const express = require('express');
const router = express.Router();
//Initalizing firestore (cloud database for firebase)
const firestore = require("firebase/firestore");

//Create a reference to the database (now we can access with db)
const db = firestore.getFirestore();


router.use((req,res,next) => {
    console.log("Time", Date.now());
    next();
});


//Querying the exact data that we need (so query by id)
//Now if we type localhost:4000/post/{insert id here}, you'll get the individual article 

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    //Get a doc (looks a little differently from documentation but means same thing)
    const postQuery = firestore.getDoc(firestore.doc(db, "posts", postId));
    //Asynchrously getting data from postQuery
    postQuery
    //Not looping this time; wait for the response
    .then((response) => {
        post = response.data();
        //If post is undefined, send an empty {} that way something is being sent
        if(!post) res.send({});
        //Whatever post is, send it to the browser
        res.send(post); 
    })
    //Handling errors
    .catch((error) => {
        console.log(error);
        return res.send(error);
    })
}); 


//Exporting the router
module.exports = router; 
