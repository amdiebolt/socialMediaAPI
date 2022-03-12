const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/friends').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/friends/:friendId').delete(removeFriend);

module.exports = router;
