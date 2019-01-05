'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    BookId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
    returned: DataTypes.BOOLEAN
  }, {});
  Loan.associate = function({Book, User}) {
    Loan.belongsTo(Book);
    Loan.belongsTo(User);
    // associations can be defined here
  };
  return Loan;
};
