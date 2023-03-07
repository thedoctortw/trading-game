var portfolioController = require("../controllers/portfolio");
var commonHelpers = require("../helpers/commonHelpers");
const db = require("../models");
const User = db.user;
const Portfolio = db.portfolio;
const Op = db.Sequelize.Op;



// Create and Save a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    name: req.body.name,
  };

  // Save User in the database
  var createUserResult = await commonHelpers.DBCreate(User, user);
  if (!createUserResult.success) {
    return res.status(500).send(createUserResult)
  }

  var userID = createUserResult.data.dataValues.id;

  var portfolio = {
    userID: userID
  }
  var createPortfolioResult = await commonHelpers.DBCreate(Portfolio, portfolio);
  if (!createPortfolioResult.success) {
    return res.status(500).send(createUserResult)
  }

  var userUpdateBody = {
    portfolio: [createPortfolioResult.data.dataValues]
  }

  var updateUserResult = await commonHelpers.DBUpdate(User, {id: userID, body: userUpdateBody})
  if (!updateUserResult.success) {
    return res.status(500).send(updateUserResult)
  }

  createUserResult.data.portfolio = createPortfolioResult.data.dataValues;
  res.send(createUserResult.data);
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: {cascade: true }
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
