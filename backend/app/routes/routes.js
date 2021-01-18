module.exports = app => {
  const taxis = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Taxi
  router.post("/", taxis.create);

  // Retrieve all Taxis
  router.get("/", taxis.findAll);

  // Retrieve a single Taxi with id
  router.get("/:id", taxis.findOne);

  // Update a Taxi with id
  router.put("/:id", taxis.update);

  // Delete a Taxi with id
  router.delete("/:id", taxis.delete);

  // Delete all Taxis
  router.delete("/", taxis.deleteAll);

  app.use('/api/taxis', router);
};
