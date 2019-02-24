'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    BookId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Rating: DataTypes.INTEGER,
    Text: DataTypes.STRING
  }, {});
  Review.associate = function({Book, User}) {
    Review.belongsTo(Book);
    Review.belongsTo(User);

  };


  return Review;
};
