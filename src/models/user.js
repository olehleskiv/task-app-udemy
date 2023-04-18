const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validadte(value) {
        if (!validator.isEmail(value)) {
          throw new Error('The email is invalid'); 
        }
      }
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 7,
      validadte(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password should not contain "password"'); 
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age should be more then 0'); 
        }
      }
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

// Relation
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
});

// Or select: false in schema for field could be used
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({'_id': user._id.toString()}, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({token});
  await user.save();

  return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error('Unable to login!')
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!')
  }

  return user;

} 

// Hash the password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  Task.deleteMany({owner: user._id});

  next();
});

const User =  mongoose.model('User', userSchema);

module.exports = User;