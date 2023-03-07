
module.exports = (sequelize, Sequelize) => {
    const Trade = sequelize.define('Trade', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            hooks: true,
            onDelete: 'cascade'
          }
        },
        shareId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Shares',
            key: 'id',
            onDelete: 'cascade'
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('BUY', 'SELL'),
          allowNull: false,
        },
      });
    return Trade;
};
