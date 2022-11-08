const express = require('express');
//Can't import in node so we changed it yp a bit
const firebase = require("firebase/app");

const app = express();
const port = process.env.PORT || 4000; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9YgWPsKK5IA6aGdmH2XCtA4X86d3XwpI",
  authDomain: "exercise-5-dynamic-web.firebaseapp.com",
  projectId: "exercise-5-dynamic-web",
  storageBucket: "exercise-5-dynamic-web.appspot.com",
  messagingSenderId: "896892973034",
  appId: "1:896892973034:web:9e823b240f63bd2ca38c93"
};

//Initalizing firebase 
firebase.initializeApp(firebaseConfig); 

//Routing for other pages
const indexRoute = require('./routes/index.js');
const singlePostRoute = require('./routes/singlePost.js');
const createPostRouter = require('./routes/createPost.js');

//Tell express to use these routes
app.use ("/", indexRoute);
app.use ("/post", singlePostRoute);
app.use("/create", createPostRouter); 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}); 

