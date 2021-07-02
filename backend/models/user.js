const { Schema, model } = require('mongoose');
const validator = require('validator');
const argon2 = require('argon2');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
    lowercase: true,
    maxlength: 320,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: [4, 'Password should have atleast 4 characters.'],
  },
  image_url: {
    type: String,
    maxlen: 255,
  },
  clubs: [
    {
      id: {
        type: Schema.Types.ObjectId, // mongoose.Schema.Types.ObjectId
        ref: 'Club',
      },
      name: String,
      image_url: String,
      is_mod: {
        type: Boolean,
        default: false
      }
    },
  ],
  tokenVersion: {
    type: Number,
    default: 0,
  },
});

userSchema.pre('save', async function (next) {
  const hash = await argon2.hash(this.password);
  this.password = hash;
  next();
});

const User = model('User', userSchema);
module.exports = User;
