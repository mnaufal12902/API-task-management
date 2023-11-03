const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database.js');

const Users = sequelize.define('users', {
    Username: {
        type: DataTypes.STRING, 
        primaryKey: true,
        allowNull: false
    },
    Nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Users;