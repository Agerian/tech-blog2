const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blog posts for homepage ('/')
router.get('/', withAuth, async (req, res ) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { posts, loggedIn: req.session.loggedIn });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single blog post by ID ('/post/:id')
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] }, 
                { model: Comment, include: [{ model: User, attributes: ['username']}]},
        ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET the login page ('/login')
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


// GET the signup page ('/signup')
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;