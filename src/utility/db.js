
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "first-database.chxhfuhqi361.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "xBoxlive195",
    database: "hello"
});


connection.connect();


// query we want to execute to test the function
let sql ="select now()";

// callback function that handles the results of
// the test query
let callback = function(err, rows){
    if(err){
        // if error is truthy, that means we have an err object
        // which means the query was not executed successfully
        console.log("Could not establish a connection to the database", err);
    } else {
        // otherwise, since our err object is falsey,
        // that means our query executed successfully,
        // so we print out the results of the query
        console.log("Connection made, test query returned", rows);
    }
};

// executes the query, and handles the results
connection.query(sql, callback);

// this is async
connection.query("select now()"  , function(err, rows){
    if(err){
        console.log("connection not successful,", err)
    }else{
        console.log("test query result,", rows)
    }

});

// execute the query, and handle the results
connection.query(sql, callback);

module.exports = connection;