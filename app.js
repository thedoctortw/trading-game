var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var shareRouter = require('./routes/share');
var portfolioRouter = require('./routes/portfolio');
var shareHoldingRouter = require('./routes/shareHolding');
var tradeRouter = require('./routes/trade');

var commonHelpers = require("./helpers/commonHelpers");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/share', shareRouter);
app.use('/portfolio', portfolioRouter);
app.use('/shareHolding', shareHoldingRouter);
app.use('/trade', tradeRouter);

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



//GAME
//create users
const User = db.user;
const Portfolio = db.portfolio;
const ShareHolding = db.shareHolding;

User.bulkCreate([
  { name: 'user1'},
  { name: 'user2'},
  { name: 'user3'},
  { name: 'user4'},
  { name: 'user5'}
]).then((createdUsers) => {
  const promises = createdUsers.map(async user => {
    var userID = user.id;
    var portfolio = {
      userID: userID
    }
    var createPortfolioResult = await commonHelpers.DBCreate(Portfolio, portfolio);
    if (!createPortfolioResult.success) {
      return res.status(500).send(createUserResult)
    }

    var userUpdateBody = {
      portfolio: [createPortfolioResult.data.dataValues]
    }

    var updateUserResult = await commonHelpers.DBUpdate(User, {id: userID, body: userUpdateBody})
    if (!updateUserResult.success) {
      return res.status(500).send(updateUserResult)
    }
  });
  return Promise.all(promises);
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
});

//create Shares
const Share = db.share;
Share.bulkCreate([
  { symbol: 'ATX', totalShares: 1000, shareRate: 100},
  { symbol: 'APP', totalShares: 200, shareRate: 20},
  { symbol: 'SSR', totalShares: 300, shareRate: 50}
]).then((createdShares) => { // Notice: There are no arguments here, as of right now you'll have to...
  const promises = createdShares.map(async share => {
    const shareHolding = {
      shareID: share.id,
      totalSharesBought: 0,
      totalSharesSold: 0,
      availableShares: share.totalShares
    };

    var createShareHoldingResult = await commonHelpers.DBCreate(ShareHolding, shareHolding);
    if (!createShareHoldingResult.success) {
        return res.status(500).send(createShareHoldingResult);
    }
    var shareUpdateBody = {
        shareHolding: [createShareHoldingResult.data.dataValues]
    };

    var updateShareResult = await commonHelpers.DBUpdate(Share, {id: share.id, body: shareUpdateBody});
    if (!updateShareResult.success) {
        return res.status(500).send(updateShareResult);
    }
  });
  return Promise.all(promises);
}).then(shares => {
  console.log(shares) // ... in order to get the array of user objects
});

module.exports = app;
