'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            BookId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Books',
                    key: 'id'
                }
            },
            UserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            Rating: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            Text: {
                defaultValue: false,
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        (queryInterface, Sequelize) => {
            return queryInterface.dropTable('Reviews');
        }
    }
};
