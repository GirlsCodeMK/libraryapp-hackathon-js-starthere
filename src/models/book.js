'use strict';
// Model definition for a book.
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    barcode: {
      type: DataTypes.STRING
    }
  }, {});

  Book.associate = function({Loan}) {
    Book.hasMany(Loan);
  };

  Book.prototype.getOnLoan = async function() {
    // A book is on loan if it has a loan associated with it
    // that hasn't been returned yet.
    const unreturnedLoansCount = await this.countLoans({where: {returned: false}});
    return unreturnedLoansCount !== 0;
  }

  return Book;
};
