const app = require("express");
const { createPost, fetch_User_Post, fetchDashboard, detail_post, postComment, deletePost, editPost } = require("../controllers/postController");
const router = app.Router();
const { requireSignIn } = require("../utils/utils");

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post('/create_post', requireSignIn, createPost, upload.single('image'));
router.post('/user/post', fetch_User_Post);
router.get('/post', fetchDashboard);
router.post('/details/:id', detail_post);
router.post('/comment', requireSignIn, postComment);
router.post('/post/delete', requireSignIn, deletePost);
router.post('/post/edit/:id', editPost)


module.exports = router
