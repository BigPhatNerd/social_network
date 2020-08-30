const router = require('express').Router();
const {
    allThoughts,
    singleThought,
    newThought,
    createReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller');


router.route("/")
    .get(allThoughts)
    .post(newThought);


router.route("/:thoughtId")
    .get(singleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtid/reactions")
    .post(createReaction)
    .delete(removeReaction)

module.exports = router;