
module.exports = (sequelize, DataTypes) =>{
    var Model = sequelize.define('userProject', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userAccountId: DataTypes.INTEGER,
        projectname: DataTypes.STRING,
        frontend: DataTypes.STRING,
        backend: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        modifiedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tablename: 'userProject' });
    Model.associate = function(models){
        //userId of the userinfo table belongs to the userAccount model
        this.userAccount = this.belongsTo(models.userAccount);
    };
    
    //Addting the instance level methods
    Model.prototype.toWeb = function(pw){
        //convert to json
        let json = this.toJSON();
        return json;
    }

    return Model;
}