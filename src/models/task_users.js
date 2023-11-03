const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database.js');

const Task_users = sequelize.define('task_users', {
    Id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Task_users;