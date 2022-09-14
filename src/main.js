// bring in express framework
let express = require("express");

// define port
let PORT = 8080

// create app server object
let app = express();


// enable our app to parse json requests
// using body-parser middleware
app.use(express.json());
app.use(express.static("public"));


// will capture all the todo routes
let workoutRoutes = require("./routes/workoutRoutes");
app.use(workoutRoutes);

// start our application server, and print out what 
// port its listening on
app.listen(PORT, function(){
    console.log("Application started on port", PORT);
});