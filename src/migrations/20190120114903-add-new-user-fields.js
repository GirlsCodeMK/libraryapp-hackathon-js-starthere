'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'name', {
      allowNull: true,
      type: Sequelize.STRING
    }).then(() => 
      queryInterface.addColumn('Users', 'membershipDate', {
        allowNull: true,
        type: Sequelize.DATE
      })
    ).then(() =>
      queryInterface.addColumn('Users', 'phone', {
        allowNull: true,
        type: Sequelize.STRING
      })
    );
   },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'name')
      .then(() => 
        queryInterface.removeColumn('Users', 'membershipDate')
      ).then(() => 
        queryInterface.removeColumn('Users', 'phone')
      );
  }
};

