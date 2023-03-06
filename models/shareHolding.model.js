module.exports = (sequelize, Sequelize) => {
    const ShareHolding = sequelize.define('ShareHolding', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        portfolioID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Portfolio',
            key: 'id'
          }
        },
        shareID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Share',
            key: 'id'
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    });
    return ShareHolding;
};
