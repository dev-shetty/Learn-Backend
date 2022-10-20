// Calling express which we installed
const express = require("express");
const app = express();

// Middleware to run static files builtin
app.use(express.static("public"));

// Builtin middleware to parse form
app.use(express.urlencoded({ extended: true }));

// to parse JSON
app.use(express.json());

// Basic Routes
// app.get <- can be post, put etc.
// app.get("route", function(request, response, next)) <-- next is not needed much

// using view enginee to render html but substitute .html -> .ejs
app.set("view engine", "ejs");

// Runs for every request
// app.use(logger);

const data = {
  name: "Deveesh",
  age: 19,
};

// Runs only for / url cam call it multiple times
app.get("/", logger, logger, (request, response) => {
  //   console.log("Here");
  //   response.sendStatus(200);
  //   response.status(500).send("Server Error!!!!");
  //   response.json({ message: "error" });
  //   response.download("server.js");
  //   response.send("Hello User"); // To send data
  //   response.json(data); // To send in json format
  response.render("index", {
    text: "World",
  });
});

const userRouter = require("./routes/users");

// Puts /users in front of all the routes....nesting routes
// app.use("/posts", postRouter);
app.use("/users", userRouter);

// Middleware for logging out
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Running the server in port 3000
app.listen(3000);
