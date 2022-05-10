const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.createPost = (req, res) => {

    const { title, body, image, author, description, userId, email } = req.body;

    const post = new Post({
        title: title,
        author: author,
        body: body,
        image: image,
        description: description,
        slug: title,
        email: email,
        userId: userId,
    });

    post.save((error, Newpost) => {
        if (error) return res.status(400).json({ error });

        if (Newpost) {
            res.status(204).json({
                msg: "Data Post successful",
                Newpost
            });
        }
    });
}


module.exports.fetch_User_Post = (req, res) => {
    // console.log(req.body.email);
    Post.find({ email: req.body.email })
        .exec((error, post) => {
            if (error) return res.status(500).json({ error });

            if (post) {
                res.status(200).json({ post });
            }
        });
}


module.exports.fetchDashboard = (req, res) => {
    Post.find({})
        .exec((error, post) => {
            if (error) return res.status(500).json({ error });

            if (post) {
                res.status(200).json({ post });
            }
        });
}


module.exports.detail_post = (req, res) => {

    if (req.body.id) {
        Post.findOne({ _id: req.body.id })
            .exec((error, postDetail) => {
                if (error) return res.status(500).json({ error });

                if (postDetail) {
                    res.status(201).json({ postDetail });
                }
            });
    }
}



module.exports.postComment = async (req, res) => {
    const { postId, comment, name } = req.body.commentData;

    Post.findOneAndUpdate({ _id: postId }, { $push: { comments: req.body.commentData } },

        function (error, success) {
            if ({ "error": error }) {
                console.log(error);
            } else {
                console.log({ msg: 'Your comment has been published', success });
            }
        });
}


module.exports.deletePost = (req, res) => {
    // console.log(req.body)

    Post.findOneAndDelete({ _id: req.body.id })
        .exec((error, post) => {
            if (error) return res.status(500).json({ error });

            if (post) {
                return res.status(200).json({ massage: "your Post is successfully Delete", post });
            }
        });
}


module.exports.editPost = (req, res) => {
    const pid = req.body.id;
    const id = req.params.id

    if (req.body.data) {
        const { title, author, body, image, description } = req.body.data;
        const updatedPost = {
            title: title,
            author: author,
            body: body,
            image: image,
            description: description,
            slug: title,
        }
        // console.log(updatedPost);

        // console.log(id);
        Post.findOneAndUpdate({ _id: id }, updatedPost, { new: true })
            .exec((error, post) => {
                if (error) return res.status(500).json({ error });

                if (post) {
                    return res.status(200).json({ massage: "your Post is successfully Updated", post });
                }
            })
    }

    if (!req.body.data) {
        Post.findOne({ _id: pid })
            .exec((error, postDetail) => {
                if (error) return res.status(501).json({ error });

                if (postDetail) {
                    res.status(201).json({ postDetail });
                }
            });
    }


}

// module.exports.editPostData = (req, res) => {
//     const { id } = req.body.id;
//     console.log(req.body)

//     if (id) {
//         Post.findOne({ _id: id })
//             .exec((error, postDetail) => {
//                 if (error) return res.status(501).json({ error });

//                 if (postDetail) {
//                     res.status(201).json({ postDetail });
//                 }
//             });
//     }
// }



