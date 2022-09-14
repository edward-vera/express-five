let express = require("express");

let routes = express.Router();

let controller = require("../controllers/workoutControllers");

routes.get("/exercise", controller.getExercise);

routes.get("/exercise/:workout", controller.getSingleExercise);

routes.delete("/exercise/:workout", controller.deleteExercise);

routes.post("/exercise", controller.createExercise);

routes.put("/exercise/:workout", controller.updateExercise);

module.exports = routes;
