const express = require("express");
const router = express.Router();

// All routes uses middleware logger
router.use(logger);

router.get("/", (req, res) => {
  // to get query like name="" from url
  console.log(req.query.name);
  res.send("User List");
});

router.get("/new", (req, res) => {
  // res.send("User new form");
  res.render("users/new");
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("ERROR");
    res.render("users/new", {
      firstName: req.body.firstName,
    });
  }
  console.log(req.body.firstName);
  res.send("Welcome " + req.body.firstName);
});

// // Dynamic parameter
// router.get("/:userId", (req, res) => {
//   //   req.params.userId; Pulling number from url
//   res.send(`Get user with ID ${req.params.userId}`);
// });
// router.put("/:userId", (req, res) => {
//   res.send(`Update user with ID ${req.params.userId}`);
// });
// router.delete("/:userId", (req, res) => {
//   res.send(`Delete user with ID ${req.params.userId}`);
// });

// Instead of writing it like above works same mention routes only once
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  });

const users = [{ name: "Deveesh" }, { name: "Gowrish" }];

//   Whenever it comes across route with id parameter
router.param("id", (req, res, next, id) => {
  // Infinite load since no next given and it acts as middleware
  // Middleware - stuff which runs between start of request to end of request
  req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
