const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        console.log('User is not authenticated');
        res.redirect('/login');
    } else {
        console.log('User authenticated');
        console.log('User ID:', req.session.user_id);
        console.log('Username:', req.session.username);
        next();
    }
};

module.exports = withAuth;