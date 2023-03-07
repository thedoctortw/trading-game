module.exports = (sequelize, Sequelize) => {
    const Share = sequelize.define('Share', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        symbol: {
            type: Sequelize.STRING(3),
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
        shareHolding: {
            type: Sequelize.ARRAY(Sequelize.JSONB),
            defaultValue: []
        }
    });
    return Share;
};
