'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
//    BookId: DataTypes.INTEGER,
    CopyId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
    returned: DataTypes.BOOLEAN
  }, {});
//  Loan.associate = function({Book, User}) {
//    Loan.belongsTo(Book);
  Loan.associate = function({Copy, User}) {
    Loan.belongsTo(Copy);
    Loan.belongsTo(User);
    // associations can be defined here
  };
  // Return a book
  Loan.prototype.return = async function() {
    this.returned = true;
    await this.save();
  }
  return Loan;
};
