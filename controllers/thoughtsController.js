const { Thoughts, User } = require('../models');

module.exports = {
  // Get all courses
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => 
      { return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughts._id } },
        { new: true }
      )})
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: thoughts.user } })
      )
      .then(() => res.json({ message: 'Thought and User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
