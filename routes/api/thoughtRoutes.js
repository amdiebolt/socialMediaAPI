const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThoughts);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

router
  .route('/:thoughtId/reaction')
  .post(addReaction)

router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(removeReaction)
  
module.exports = router;
