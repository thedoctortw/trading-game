const db = require("../models");
const ShareHolding = db.shareHolding;
const Op = db.Sequelize.Op;

// Create and Save a new shareHolding
exports.create = (req, res) => {
    // Validate request
    if (!req.body.portfolioID && !req.body.totalSharesBought && !req.body.totalSharesSold) {
      res.status(400).send({
        message: "Fields can not be empty!"
      });
      return;
    }
  
    // Create a shareHolding
    const shareHolding = {
        shareID: req.body.shareID,
        totalSharesBought: req.body.totalSharesBought,
        totalSharesSold: req.body.totalSharesSold,
        availableShares: req.body.totalSharesBought - req.body.totalSharesSold
    };
  
    // Save ShareHolding in the database
    ShareHolding.create(shareHolding)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ShareHolding."
        });
      });
  };
  
  // Retrieve all shareHoldings from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${title}%` } } : null;
  
    ShareHolding.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shareHoldings."
        });
      });
  };
  
  // Find a single shareHolding with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ShareHolding.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ShareHolding with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ShareHolding with id=" + id
        });
      });
  };
  
  // Update a shareHolding by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    ShareHolding.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ShareHolding was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ShareHolding with id=${id}. Maybe ShareHolding was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ShareHolding with id=" + id
        });
      });
  };
  
  // Delete a shareHolding with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    ShareHolding.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ShareHolding was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ShareHolding with id=${id}. Maybe ShareHolding was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ShareHolding with id=" + id
        });
      });
  };
  // Delete all shareHoldings from the database.
  exports.deleteAll = (req, res) => {
    ShareHolding.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} ShareHoldings were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all shareHoldings."
        });
      });
  };
  
