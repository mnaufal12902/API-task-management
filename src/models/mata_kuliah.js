const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database.js');

const Mata_Kuliah = sequelize.define('mata_kuliah', {
    UID_Matkul: {
        type: DataTypes.STRING, 
        primaryKey: true,
        allowNull: false
    },
    Mata_Kuliah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Mata_Kuliah;