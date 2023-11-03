const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database.js');

const Member_Grup = sequelize.define('member_grup', {
    ID_Member: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true,
    },
    UID_Grup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Nama: {
        type: DataTypes.STRING,
        allowNull: false,
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Member_Grup;