const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

const userSchema = new  mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});

// Hashing  password before  saving
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,8);
    next();
});
module.exports = mongoose.model("User",userSchema);