const { Schema, model } = require('mongoose')
const thoughttSchema = require('./Reaction')

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 20,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

  const User = model('user', userSchema)

module.exports = User
