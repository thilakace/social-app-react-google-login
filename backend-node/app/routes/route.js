const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../model/User');
const Auth = require('../controller/auth/login');
const UserController = require('../controller/UserController');
const PostsController = require('../controller/PostsController');
const verifyToken = require('../middleware/verifytoken');
const cors = require('cors');
var path = require('path');


// for parsing application/json
router.use(bodyParser.json()); 

router.get('/', (req, res) => {
  res.render('login', {
    locals: {
      title:  'ES6 Renderer'
    },
    partials: {
      partial: process.cwd() + '/app/views/main.html'
    }
});
})

router.get('/dashboard', (req, res) => {
  res.render('index', {
    locals: {
      title:  'ES6 Renderer'
    },
    partials: {
      partial: process.cwd() + '/app/views/admin_layout.html'
    }
});
})

router.get('/admin/login', (req, res) => {
  res.render('login', {locals: {title: 'Welcome!'}});
})

// POST method route
router.post('/register', (req, res) => {
    res.send(req.body)
})
router.post('/login', (req, res) => {
    res.send('login api works')
})

router.get('/test/:userId', (req, res) => {
    res.send('hello world'+req.params.userId)
})

//sample post data
// router.post('/api/register', function(req, res) {
//     const user_id = req.body.id;
//     const token = req.body.token;
//     const geo = req.body.geo;
    
    
//     res.send(req.body);
// });

router.post('/api/register', UserController.addUser);

router.get('/api/users', verifyToken, UserController.getAllUsers);

//auth
router.post('/api/doLogin', cors(), Auth.doLogin);
router.post('/api/googleLogin', cors(), Auth.googleLogin);

//post public
router.get('/api/posts/:module', cors(), PostsController.getDataList);
router.put('/api/posts/:slug/:module',  PostsController.getSingleData);
router.post('/api/posts_like_share/', cors(), PostsController.PostLikeShare);

//post auth
router.get('/api/posts-edit/:id/:module',  verifyToken, PostsController.getEditpost);
router.post('/api/posts-update/:id/:module', verifyToken, PostsController.updatePost); // new post
router.post('/api/posts/:module', verifyToken, PostsController.createNewPosts); // new post
router.get('/api/get-author-posts/:userId/:module/:prupose',  PostsController.getAuthorsPostData);
router.post('/api/get-publish-posts/:module',  PostsController.getPublishPost);
router.get('/api/check-user', verifyToken, UserController.getUserInfo); // new post

//admin 
router.post('/doLogin',  Auth.doLogin);

router.use('*', (req, res) => {
    res.status(404).json({
      errors: {
        msg: 'URL_NOT_FOUND'
      }
    })
  })

 
  
  module.exports = router