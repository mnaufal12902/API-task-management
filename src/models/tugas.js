const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');

const {uuid} = require('uuidv4');
const Tugas = sequelize.define('tugas', {
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
    People: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Tugas;