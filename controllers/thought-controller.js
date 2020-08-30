const { Thought, User } = require('../models');

const thoughtController = {
    allThoughts({ params }, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err))
    },
    singleThought({ params, body }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(400).json(err);
            })
    },
    newThought({ params, body }, res) {
        console.log("\n\n params: ", params);
        console.log("\n\nbody: ", body);
        console.log("\n\nbody.userId: ", body.userId);

        Thought.create(body)
            .then((dbThoughtData) => {
                console.log("\n\ndbThoughtData: ", dbThoughtData);
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true });

            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with that id!" });
                    return;
                }
                res.json({ message: "Thought successfully created!" });
            })
            .catch(err => res.json(err));
    },
    createReaction({ params, body }, res) {
        console.log("body: ", body);
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! " });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        console.log("\n\n\nparams: ", params);
        console.log("\n\n\n body: ", body);
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $set: body }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err))
    },
    deleteThought({ params, body }, res) {
        console.log("\n\nparams: ", params);
        console.log("\n\nbody: ", body);
        Thought.findOneAndRemove({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id!" });

                }
                return User.findOneAndUpdate({ thoughts: params.thoughtId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought created but no user with this id!" });
                }
                res.json({ message: "Thought successfully deleted!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id!" });

                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};


module.exports = thoughtController;







//