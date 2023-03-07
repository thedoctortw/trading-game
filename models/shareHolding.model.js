module.exports = (sequelize, Sequelize) => {
    const ShareHolding = sequelize.define('ShareHolding', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        shareID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Shares',
            key: 'id',
            onDelete: 'cascade'
          }
        },
        totalSharesBought: {
          type: Sequelize.INTEGER,
          defaultValue:0,
          allowNull: false
        },
        totalSharesSold: {
          type: Sequelize.INTEGER,
          defaultValue:0,
          allowNull: false
        },
        availableShares: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    });
    return ShareHolding;
};
