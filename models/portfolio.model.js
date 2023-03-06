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
            model: 'User',
            key: 'id'
          }
        },
        shareList: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: true
        }
    });
    return Portfolio;
};
