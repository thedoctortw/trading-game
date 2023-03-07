var commonHelpers = require("../helpers/commonHelpers");
const { user } = require("../models");
const db = require("../models");
const Trade = db.trade;
const Op = db.Sequelize.Op;

// Create and Save a new trade
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.userId && !req.body.shareId && !req.body.quantity && !req.body.price && !req.body.type) {
      res.status(400).send({
        message: "fields can not be empty!"
      });
      return;
    }

    var transactionType = req.body.type;
    var shareRate;
    var quantity = req.body.quantity;
    var tradeResult;

    const Share = db.share;
        var share = await commonHelpers.DBFindOne(Share, req.body.shareId);

        if (!share.success) {
            return res.status(500).send({
                message: "Error. share is not found!!"
            })
        }

        shareRate = share.data.dataValues.shareRate;

        const ShareHolding = db.shareHolding;
        var shareHolding = await commonHelpers.DBFindOne(ShareHolding, share.data.dataValues.shareHolding[0].id);
        if(!shareHolding.success) {
            return res.status(500).send({
                message: "Error. ShareHolding is not found!!"
            });
        }

    if (transactionType == "BUY") {
        var availableShares = shareHolding.data.dataValues.availableShares;
        if (quantity >= availableShares) {
            return res.status(500).send({
                message: "Error. not enough available shares to buy!!"
            });
        }

        const trade = {
            userId: req.body.userId,
            shareId: req.body.shareId,
            quantity: req.body.quantity,
            price: shareRate,
            type: req.body.type
        };

        var tradeResult = await commonHelpers.DBCreate(Trade, trade);
        if (!tradeResult.success) {
            return res.status(500).send({
                message: "Error. trade is not created : " + tradeResult.message
            });
        }

        shareHolding.data.dataValues.totalSharesSold += quantity;
        shareHolding.data.dataValues.availableShares = share.data.dataValues.totalShares - (shareHolding.data.dataValues.totalSharesSold - shareHolding.data.dataValues.totalSharesBought);
        var updateShareHolding = await commonHelpers.DBUpdate(ShareHolding, {id: shareHolding.data.dataValues.id, body: shareHolding.data.dataValues});
        if (!updateShareHolding.success) {
            return res.status(500).send({
                message: "Error. shareHolding is not updated : " + updateShareHolding.message
            });
        }
    } else if (transactionType == "SELL") {
        var availableShares = shareHolding.data.dataValues.availableShares;
        if (quantity > share.data.dataValues.totalShares - shareHolding.data.dataValues.availableShares) {
            return res.status(500).send({
                message: "Error. not enough available shares to buy!!"
            });
        }

        const trade = {
            userId: req.body.userId,
            shareId: req.body.shareId,
            quantity: req.body.quantity,
            price: shareRate,
            type: req.body.type
        };

        var tradeResult = await commonHelpers.DBCreate(Trade, trade);
        if (!tradeResult.success) {
            return res.status(500).send({
                message: "Error. trade is not created : " + tradeResult.message
            });
        }

        shareHolding.data.dataValues.totalSharesBought += quantity;
        shareHolding.data.dataValues.availableShares = share.data.dataValues.totalShares - (shareHolding.data.dataValues.totalSharesSold - shareHolding.data.dataValues.totalSharesBought);
        var updateShareHolding = await commonHelpers.DBUpdate(ShareHolding, {id: shareHolding.data.dataValues.id, body: shareHolding.data.dataValues});
        if (!updateShareHolding.success) {
            return res.status(500).send({
                message: "Error. shareHolding is not updated : " + updateShareHolding.message
            });
        }
    }

    res.send(tradeResult.data)
  };
  
  // Retrieve all trades from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${title}%` } } : null;
  
    Trade.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving trades."
        });
      });
  };
  
  // Find a single trade with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Trade.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Trade with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Trade with id=" + id
        });
      });
  };
  
  // Update a trade by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Trade.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Trade was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Trade with id=${id}. Maybe Trade was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Trade with id=" + id
        });
      });
  };
  
  // Delete a trade with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Trade.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Trade was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Trade with id=${id}. Maybe Trade was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Trade with id=" + id
        });
      });
  };
  // Delete all trades from the database.
  exports.deleteAll = (req, res) => {
    Trade.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Trades were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all trades."
        });
      });
  };
  
