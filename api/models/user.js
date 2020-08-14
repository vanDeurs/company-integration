const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  apiKeys: [{
    type: Schema.Types.ObjectId,
    ref: 'Integration'
  }]
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  const { password } = this;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  this.password = hashed;

  next();
})

UserSchema.methods.comparePassword = function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  // Create login token
  const token = jwt.sign({ _id: user._id.toHexString() }, process.env.TOKEN_SECRET, { expiresIn: '24h' }).toString();

  // Add token to user
  user.token = token;

  // Update all the changes
  await user.save();
  return token;
}

UserSchema.statics.findByToken = async function (token) {
  // See if a user exists with the token
  // If so, confirm the token is not expired.
  const User = this;
  try {
    const user = await User.findOne({ token });
    if (!user) return null;

    jwt.verify(token, process.env.TOKEN_SECRET);

  } catch (error) {
    return null;
  }
  // If the token is valid, return the correct user
  return user;
}

UserSchema.statics.findByCredentials = async function (data) {
  const { email, password } = data;
  const User = this;

  try {
    const user = await User.findOne({ email })
    .populate('items apiKeys');
  
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
  return null;
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
