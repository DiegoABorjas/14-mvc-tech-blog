const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts to show on Dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
         where: {
            user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name']
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'date_created', 'user_id', 'post_id'],
            include: {
              model: User,
              attributes: ['name']
            }
          }
        ],
        logging: console.log
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;