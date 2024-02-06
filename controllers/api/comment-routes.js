const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST create a new comment ( '/api/comments')
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Put update a comment by ID ( '/api/comments/:id')
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                comment: req.body.comment,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if (!updatedComment[0]) {
            res.status(404).json({ message: 'No comment found with this ID!'});
            return;
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a comment by ID ( '/api/comments/:id')
router.delete('/:id', async (req,res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this ID!' });
            return;
        }

        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;