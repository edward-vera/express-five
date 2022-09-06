// bring in express framework
let express = require("express");

// define port
let PORT = 8080

// create app server object
let app = express();

// enable our app to parse json requests
// using body-parser middleware
app.use(express.json());

// start our application server, and print out what 
// port its listening on
app.listen(PORT, function(){
    console.log("Application started on port", PORT);
});

// database of items
let exercise = [];

// get all workouts
app.get("/exercise", function(req, res){
    console.log("GET /exercise");
    res.json(exercise);
    
});

// get items listed by workout
app.get("/exercise/:workout", function(req, res){
    console.log("GET /exercise/:workout")
    let myWorkout = req.params.workout;


    // find exercises in db that match the workout chosen
    let matchingWorkout = exercise.find(function(item, index){
        return item.workout == myWorkout;
    })

    // find exercise with matching workout in the array
    if(matchingWorkout){
        res.json(matchingWorkout);
    }else{
        res.json(null);
    }
});

// delete a specific exercise by workout
app.delete("/exercise/:workout", function(req, res){
    console.log("DELETE /exercise/:workout");


    // find workout you want to delete
    let myWorkout = req.params.workout;

    // find position of workout in array and remove it from the array
    let matchingWorkout = exercise.findIndex(function(item, index){
        return item.workout != myWorkout;
    })
    
    // if index < 0 then there is no match in the array
    if (matchingWorkout < 0){
        res.json(null);
    }else {
        // remove item in exercise array and return it
        let deletedWorkout = exercise.splice(matchingWorkout, 1);
        res.json(deletedWorkout);
    }
});


// create/post an item
app.post("/exercise", function(req, res){
    console.log("POST /exercise");

    // read description on new req body
    // create a new exercise
    let newWorkout = {};
    newWorkout.description = req.body.description;
    newWorkout.reps = req.body.reps;
    newWorkout.sets = req.body.sets;
    newWorkout.completed = false;



    // let newWorkout = {
    //     "description": req.body.description,
    //     "sets": req.body.sets,
    //     "reps": req.body.reps,
    //     "completed": false
    // }

    // add new workout to exercise array
    exercise.push(newWorkout);
    // return new workout on res
    res.json(newWorkout);
});


// update/put an exercise
app.put("/excercise/:workout", function(req, res){
    console.log("PUT /exercise/:workout")

    // get workout to update from the route
    let myWorkout = req.params.workout;

    // get the new workout from the body
    let description = req.body.description;

    // get new sets from the body
    let sets = req.body.sets;

    // get new reps
    let reps = req.body.reps;
    
    // get new completed flag from the body only if equal to true
    // forces the flag to be true or false
    let completed = req.body.completed == true;

    // we need to get item we want to update from the exercise array
    let matchingWorkout = exercise.find(function(item, index){
        return item.workout = myWorkout;
    });

    // if we found a matching item, update it
    // and return the updated item in the res
    // if not return null
    if(matchingWorkout){
        matchingWorkout.description = description;
        matchingWorkout.sets = sets;
        matchingWorkout.reps = reps;
        matchingWorkout.completed = completed;
    }else{
        return res.json(null)
    }


});
