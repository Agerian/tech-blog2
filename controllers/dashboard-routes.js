const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET all user's posts for the dashboard ('/dash')
router.get('/', withAuth, async (req, res) => {
    try {
        const userPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
            ],
        });
        
        const userPosts = userPostData.map((post) => post.get({ plain: true}));

        res.render('dashboard', { userPosts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Render the page to create a new post ('/dash/new')
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { logged_in: req.session.logged_in });
});


// GET a single post by ID


// POST create a new blog post

// PUT update a blog post by ID


// DELETE a blog post by ID


module.exports = router;
