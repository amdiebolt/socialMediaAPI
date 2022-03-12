const { Schema, model } = require('mongoose');
const dateFormat = require('../../ucsd-sd-fsf-pt-09-2021-u-c/ucsd-sd-fsf-pt-09-2021-u-c/18-NoSQL/02-Homework/Main/utils/dateFormat');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength:280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: 
      [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

const Course = model('course', thoughtSchema);

module.exports = Course;
