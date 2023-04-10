const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})
userSchema.statics.login= async function(email,password){
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect Password');
    }
    return user;

}
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
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
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
    const user = this.create({ email, password: hash });
    return user;
}

module.exports = mongoose.model('User', userSchema);