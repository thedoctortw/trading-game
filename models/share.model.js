module.exports = (sequelize, Sequelize) => {
    const Share = sequelize.define('Share', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        symbol: {
            type: Sequelize.STRING,
            allowNull: false
        },
        totalShares: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shareRate: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        previousPrices: {
            type: Sequelize.ARRAY(Sequelize.DECIMAL(10,2)),
            allowNull: true
        }
    });
    return Share;
};
