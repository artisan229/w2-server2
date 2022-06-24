const Sequelize = require('sequelize');

module.exports = class Movie extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            code: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            director: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
            },
            poster: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            movie: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            about: {
                type: Sequelize.STRING(500),
            },
            tag: {
                type: Sequelize.STRING(500),
            },
            running_time: {
                type: Sequelize.INTEGER(),
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Movie',
            tableName: 'movie',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}