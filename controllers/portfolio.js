const db = require("../models");
const Portfolio = db.portfolio;
const Op = db.Sequelize.Op;

// Create and Save a new portfolio
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userID) {
      res.status(400).send({
        message: "userID can not be empty!"
      });
      return;
    }
  
    // Create a portfolio
    const portfolio = {
        userID: req.body.userID,
    };
  
    // Save Portfolio in the database
    Portfolio.create(portfolio)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Portfolio."
        });
      });
  };
  
  // Retrieve all portfolios from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${title}%` } } : null;
  
    Portfolio.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving portfolios."
        });
      });
  };
  
  // Find a single portfolio with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Portfolio.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Portfolio with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Portfolio with id=" + id
        });
      });
  };
  
  // Update a portfolio by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Portfolio.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Portfolio was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Portfolio with id=${id}. Maybe Portfolio was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Portfolio with id=" + id
        });
      });
  };
  
  // Delete a portfolio with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Portfolio.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Portfolio was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Portfolio with id=${id}. Maybe Portfolio was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Portfolio with id=" + id
        });
      });
  };
  // Delete all portfolios from the database.
  exports.deleteAll = (req, res) => {
    Portfolio.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Portfolios were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all portfolios."
        });
      });
  };
  
