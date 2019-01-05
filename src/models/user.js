'use strict';

import bcrypt from 'bcrypt';
// Number of salt rounds for bcrypt algorithm.
// Find out more: https://en.wikipedia.org/wiki/Bcrypt
const SALT_ROUNDS = 10;

// Be careful changing this code; encryption is hard.
// Re-hash the password if the user changes it.
const hashPassword = async (user) => {
  if (!user.changed('password')) { return; }
  const hash = await bcrypt.hash(user.getDataValue('password'), SALT_ROUNDS);
  return user.setDataValue('encryptedPassword', hash);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      // Use getDataValue() to actually get the encrypted password; this
      // prevents it accidentally appearing in JSON representations of the
      // user.
      get() { return null; }
    },
    // Virtual attribute. This lets us validate the password, without the risk
    // of saving it unencrypted to the DB. If this is set, encryptedPassword
    // will be updated via hooks.
    password: {
      type: DataTypes.VIRTUAL,
      // TODO: Validation
      set(val) { this.setDataValue('password', val) },
      // As above
      get() { return null; }
    }
  }, {
    indexes: [
      {
        fields: ['email'],
        unique: true
      }
    ],
    hooks: {
      beforeValidate: hashPassword
    }
  });
  User.associate = function({Loan}) {
    User.hasMany(Loan);
  };
  return User;
};
