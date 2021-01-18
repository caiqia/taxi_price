const db = require("../models");
const Taxi = db.taxis;
const Op = db.Sequelize.Op;

// Create and Save a new Taxi
exports.create = (req, res) => {


  // Create a Taxi
  const taxi = {
    distance: req.body.distance,
    startTime: req.body.startTime,
    duration: req.body.duration
  };

  // Save Taxi in the database
  Taxi.create(taxi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Taxi."
      });
    });
  
};

// Retrieve all Taxis from the database.
exports.findAll = (req, res) => {
	const distance = req.query.distance;
  	var condition = distance ? { distance: { [Op.like]: `%${distance}%` } } : null;

  	Taxi.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taxis."
      });
    });
  
};

// Find a single Taxi with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

  	Taxi.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Taxi with id=" + id
      });
    });
  
};

// Update a Taxi by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

  Taxi.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Taxi was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Taxi with id=${id}. Maybe Taxi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Taxi with id=" + id
      });
    });
  
};

// Delete a Taxi with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

  Taxi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Taxi was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Taxi with id=${id}. Maybe Taxi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Taxi with id=" + id
      });
    });
  
};

// Delete all Taxi from the database.
exports.deleteAll = (req, res) => {
	Taxi.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Taxi were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all taxis."
      });
    });
	

  
};


