const User = require('../models').userAccount;
const authService = require('./../services/AuthService');

//Add the new user to userAccount table
const addUser = async function(req, res) {
    let body = req.body;
    let err, user;
    [err, user] = await to(User.create(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, { userDetails: user.toWeb() });
};

module.exports.addUser = addUser;

//get all users from the userAccount table
const getUsers = async function(req, res) {
    //let body = req.body;
    let err, userslist;
    [err, userslist] = await to(User.findAll());
    console.log(userslist);
    if (err) return ReE(res, err, 422);

    return ReS(res, { usersList: userslist });
};

module.exports.getUsers = getUsers;


//get particular user from the userAccount table
const getUser = async function(req, res) {
    let body = req.body;
    console.log("Controller GetUser : " + body.id);
    let err, userlist;
    [err, userlist] = await to(User.findAll({where: {id: body.id}}));
    console.log(userlist);
    if (err) return ReE(res, err, 422);

    return ReS(res, { userlist: userlist });
};

module.exports.getUser = getUser;

//update the user details
const updateUser = async function(req, res) {
    let body = req.body;
    // console.log("Controller : " + body);
    let err, updateuser;
    [err, updateuser] = await to(User.update( body.user, {where:{id: body.userId}} ));
    console.log(updateuser);
    if (err) return ReE(res, err, 422);

    return ReS(res, { updateuser: updateuser });
};

module.exports.updateUser = updateUser;

const deleteUser = async function(req, res) {
    let body = req.body;
    // console.log("Controller : " + body);
    let err, deleteuser;
    [err, deleteuser] = await to(User.destroy({where:{id: body.id}}));
    console.log(deleteuser);
    if (err) return ReE(res, err, 422);

    return ReS(res, { deleteuser: deleteuser });
};

module.exports.deleteUser = deleteUser;


const Login = async function(req, res){
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    return ReS(res, { loginuser: user });
};

module.exports.Login = Login;