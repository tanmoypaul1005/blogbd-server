const { default: mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    body: { type: String },
    image: { type: String },
    description: { type: String },
    slug: { type: String },
    email: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

    comments: [{
        // Comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
        comment: { type: String, required: true },
        name: { type: String, required: true },
    }]

}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);