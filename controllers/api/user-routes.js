const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

// User Login ('/api/user/login')
router.post('/login', async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            console.log('User logged in successfully');
            console.log('Session:', req.session);
            res.redirect('/');
        });
    } catch (err) {
        console.log('Login error:', err);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

// User Logout ('/api/user/logout')
router.post('/logout', withAuth, async (req, res) => {
    console.log('Logout request recieved:', req.session)
    if (req.session.loggedIn) {
//      console.log('Destroying session:', req.session.id)
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      console.log('No session to destroy')
      res.status(404).end();
    }
});

// User Signup ('/api/user)
router.post('/', async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        console.log('New user:', newUser);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.redirect('/');
        });
    } catch (err) {
        console.error('Error creating new user:', err);
        res.status(500).json(err);
    }
});

module.exports = router;