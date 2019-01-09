'use strict';
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) =>{
    var Model = sequelize.define('userAccount', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        modifiedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tablename: 'userAccount' });
    Model.associate = function(models){
        //id of userAccount table connected with multiple userInfo rows
        this.userProject = this.hasMany(models.userProject);
    };
    //Addting the instance level methods
    Model.prototype.toWeb = function(pw){
        //convert to json
        let json = this.toJSON();
        return json;
    }
    return Model;
}