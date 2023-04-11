const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const findOrCreate = require("mongoose-findorcreate");
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: false
    },
    googleId:{
        type: String,
        require: false
    }
})
userSchema.plugin(findOrCreate);
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect Password');
    }
    return user;

}
// userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
//     var userObj = new this();
//     const user = this.findOne({ _id: profile.id });
//     if (!user) {
//         userObj.username = profile.username;
//         userObj.email = profile.email;
//         userObj.save(cb);
//     } else {
//         cb(err, user);
//     }
// }

userSchema.statics.signup = async function (username, email, password) {
    console.log(username)
    if (!email || !password || !username) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exist = await this.findOne({ email });
    if (exist) {
        throw Error('Email already in use');
    }
    const exist1 = await this.findOne({ username });
    if (exist) {
        throw Error('Username already in use');
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
    const user = this.create({ username, email, password: hash });
    return user;
}

module.exports = mongoose.model('User', userSchema);