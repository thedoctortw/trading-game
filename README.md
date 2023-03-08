# trading-game
Project Description: An arbitrarily trading game developed by a startup in a very short span of time called “Super Traders” . The purpose of the application is to educate users on the terminology used in trading of shares. 

Make sure to edit db.config.js for your own environment:
module.exports = {
    HOST: "localhost",
    USER: "me",
    PASSWORD: "password",
    DB: "api",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

missing parts due to time constraint:
- doesn't update portfolio based on bought or sold shares
- Doesn't support cascade deletion. You need to delete the db tables in a specific order or it will raise "violates foreign key constraint" error. I found the root cause of the error. However didn't want to spend time to apply as I am already late.
- jsDocs
- BulkCreating trades logs (you can create them manually via postman Create Trade endpoint)
- in commonHelpers I generalized CRUD operations for sequelize but I didn't apply them on everywhere. It can drastically reduce the amount of code used.
- I could've changed the naming convention in models. It doesn't follow the standard in other parts of the codebase.
