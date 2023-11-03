const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');

const {uuid} = require('uuidv4');
const Grup_Task = sequelize.define('grup_task', {
    UID: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: uuid
    },
    Judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mata_Kuliah: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Jam: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Grup_Task;