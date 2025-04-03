const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const UserSchema = new Schema({
     username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores']
     },
     email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']
     },
     password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
     },
     displayname:{
        type: String,
        required: [true, 'Display name is required'],
        trim: true,
        maxlength: [50, 'Display name cannot exceed 50 characters']
     },
     bio:{
        type: String,
        maxlength: [160, 'Bio cannot exceed 160 characters'],
        default: ''
     },
     profileimage:{  
        type: String,
        default: "default-image.png"
     },
     coverimage:{
        type: String,
        default: "default-image.png"
     },
     followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
     }],
     following:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
     }],
     isDeleted:{
        type: Boolean,
        default: false
     }
}, {timestamps: true});

// Fix: Use regular function instead of arrow function
UserSchema.pre('save', function(next) {
    // 'this' now refers to the document being saved
    if(!this.isModified('password'))
      return next();

    try {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

// Fix: Use mongoose.model instead of new mongoose.model
const User = mongoose.model('User', UserSchema);

module.exports = User;