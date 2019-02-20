module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'role', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'Borrower'
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn('Users', 'role');
  }
};
