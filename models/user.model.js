module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        portfolio: {
            type: Sequelize.ARRAY(Sequelize.JSONB),
            defaultValue: []
        }
    });
    return User;
};
