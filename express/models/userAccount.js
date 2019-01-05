'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
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
    
     //Class level methods to making the encrypted password and save this.
  Model.beforeSave(async(user, options) => {
    let err;
    // Hash the password if it has been changed or is new
    if (user.changed('password')) {
      let salt, hash;
      //Asynchronously generates a salt.
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) {
        console.log(err.message);
      };

      //Asynchronously generates a hash with salt
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) {
        console.log(err.message);
      };

      user.password = hash;
    }
  });

    //Instance level methods to compare the password 
    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        console.log("password : " + this.password);
        if (!this.password) TE('password not set');
    
        //Password verification
        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);
    
        if (!pass) TE('invalid password');
    
        return this;
      };

    //Addting the instance level methods
    Model.prototype.toWeb = function(pw){
        //convert to json
        let json = this.toJSON();
        return json;
    }
    return Model;
}