import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

// Automatically remove password when converting to JSON
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
