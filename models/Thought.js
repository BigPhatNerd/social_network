const { Schema, model, Types } = require('mongoose');
const validate = require('mongoose-validator');
const moment = require('moment');

const thoughtValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 260],
        message: "thought should be between 1 and 260 characters'"
    }),

];

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        validate: thoughtValidator
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    }
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: thoughtValidator

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),

    },
    username: {
        type: String,
        required: true
    },

    reactions: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;






//