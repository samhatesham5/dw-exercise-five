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

router.get("/", (req, res) => {
    //Make a request to firestore using these functions to reference to our database
    const postsQuery = firestore.getDocs(firestore.collection(db, "posts"));
    const postsArray = []; 
    //Calling post Query
    postsQuery
    //Looping over the response of postQuery 
    .then((response) => {
        response.forEach((post) => {
            console.log(post.data());
            //For each response, push the response as an object into our empty array (postsArray)
            //Whatever posts.data is, ... spreads it so rather than making multiple objects you make one with multiple key value pairs
            postsArray.push({id: post.id,...post.data()});
        });
        res.send(postsArray); 
    })
    //Handling errors
    .catch((error) => {
        console.log(error);
        return res.send(error);
    })
}); 

//Exporting the router
module.exports = router; 

