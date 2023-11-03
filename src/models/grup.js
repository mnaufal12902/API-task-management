const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database.js');

const Grup = sequelize.define('grup', {
    UID_Grup: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true,
    },
    UID_Matkul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Grup;