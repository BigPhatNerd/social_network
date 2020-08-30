const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require("../../controllers/user-controller");


router.route("/")
    .get(getUsers)
    .post(createUser)

router.route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:userId/friends/:friendId")
    .post(addNewFriend)
    .delete(deleteFriend)
module.exports = router;