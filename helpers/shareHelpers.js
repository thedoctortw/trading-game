exports.canUpdateSharePrice = (share) => {
    var currentTime = new Date();
    var lastUpdate = new Date(share.data.dataValues.updatedAt);
    var hourDifference = Math.abs(currentTime - lastUpdate) / 36e5;
    return hourDifference > 1;
}