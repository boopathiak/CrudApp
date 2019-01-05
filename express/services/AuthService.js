const User = require('./../models').userAccount;
const validator = require('validator');


/**
 * Async function to checking the email and password for login.
 * If email and password is match then return the user.
 * @param userAccountInfo //containes the email and password 
 */

const authUser = async function (userAccountInfo) {//returns token
    let emailId = userAccountInfo.email;
    let loginuser;
    //Check the given email is valid email
    if (validator.isEmail(emailId)) {
        console.log("Email : " + emailId);
        //findOne mwthod to find the user for the given email id.
        [err, loginuser] = await to(User.findOne({ where: { email: emailId } }));
        // console.log("Controller : " + loginuser);
        if (err) TE(err.message);

    } else {
        TE('Enter the Valid Email');
    }

    if (!loginuser) TE('Not registered');

    //For comparing the given password to the user instance
    [err, loginuser] = await to(loginuser.comparePassword(userAccountInfo.password));

    if (err) TE(err.message);

    return loginuser;

}
module.exports.authUser = authUser;