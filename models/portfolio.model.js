module.exports = (sequelize, Sequelize) => {
    const Portfolio = sequelize.define('Portfolio', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            onDelete: 'cascade'
          }
        },
        shareList: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: true
        }
    });
    return Portfolio;
};
