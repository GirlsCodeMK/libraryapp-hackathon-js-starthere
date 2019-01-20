'use strict';
// Model definition for a copy of a book.
module.exports = (sequelize, DataTypes) => {
  const Copy = sequelize.define('Copy', {
    BookId: {
      type: DataTypes.INTEGER,
    },
    copyAcquisitionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    copyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    copyCondition: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['mint', 'good', 'worn', 'damaged', 'lost', 'destroyed']
    }
  }, {});

  Copy.associate = function({Book, Loan}) {
    Copy.has(Book);
    Copy.hasMany(Loan);
  };

  Copy.prototype.getOnLoan = async function() {
    // A book copy is on loan if it has a loan associated with it
    // that hasn't been returned yet.
    const unreturnedLoansCount = await this.countLoans({where: {returned: false}});
    return unreturnedLoansCount !== 0;
  }

  return Copy;
};

/*
COPY_CONDITIONS = (
    ('M', 'Mint'),
    ('G', 'Good'),
    ('W', 'Worn'),
    ('D', 'Damaged'),
    ('L', 'Lost'),
    ('X', 'Destroyed'),
)
*/
