const router = require('express').Router();

router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('dashboard', { username: req.session.username }, { layout: 'main' });
});

module.exports = router;