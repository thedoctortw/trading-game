var commonHelpers = require("../helpers/commonHelpers");
var shareHelpers = require("../helpers/shareHelpers");
const db = require("../models");
const Share = db.share;
const ShareHolding = db.shareHolding;
const Op = db.Sequelize.Op;


// Create and Save a new share
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.symbol) {
        return res.status(400).send({
            message: "symbol can not be empty!"
        });
    }

    // Create a share
    const share = {
        symbol: req.body.symbol,
        totalShares: req.body.totalShares,
        shareRate: req.body.shareRate
    };

    var createShareResult = await commonHelpers.DBCreate(Share, share);
    if (!createShareResult.success) {
        return res.status(500).send(createShareResult);
    }

    const shareHolding = {
        shareID: createShareResult.data.dataValues.id,
        totalSharesBought: 0,
        totalSharesSold: 0,
        availableShares: createShareResult.data.dataValues.totalShares
    };

    var createShareHoldingResult = await commonHelpers.DBCreate(ShareHolding, shareHolding);
    if (!createShareHoldingResult.success) {
        return res.status(500).send(createShareHoldingResult);
    }
    var shareUpdateBody = {
        shareHolding: [createShareHoldingResult.data.dataValues]
    };

    var updateShareResult = await commonHelpers.DBUpdate(Share, {id: createShareResult.data.dataValues.id, body: shareUpdateBody});
    if (!updateShareResult.success) {
        return res.status(500).send(updateShareResult);
    }

    createShareResult.data.shareHolding = createShareHoldingResult.data.dataValues;
    res.send(createShareResult.data);
};

// Retrieve all shares from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${title}%` } } : null;

    Share.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving shares."
            });
        });
};

// Find a single share with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Share.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Share with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Share with id=" + id
            });
        });
};

// Update a share by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    // Check if shareRate can be updated
    var foundShare = await commonHelpers.DBFindOne(Share, id);
    if (!shareHelpers.canUpdateSharePrice(foundShare)) {
        return res.status(400).send({
            message: "Error! You already updated share price within the hour!"
        });
    }

    Share.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Share was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Share with id=${id}. Maybe Share was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Share with id=" + id
            });
        });
};

// Delete a share with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Share.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Share was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Share with id=${id}. Maybe Share was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Share with id=" + id
            });
        });
};
// Delete all shares from the database.
exports.deleteAll = (req, res) => {
    Share.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Shares were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all shares."
            });
        });
};

