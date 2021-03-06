'use strict';

// MongoDB config
const mongojs = require('mongojs');
const connectionString = 'mongodb://snrumen:sn123456@ds137530.mlab.com:37530/sports_news_data';
const collections = ['main-news', 'users', 'comments'];

const db = mongojs(connectionString, collections);

// EXPRESS config
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

const app = express();

// body-parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
const staticFolderName = './client';
app.use('/', express.static(path.join(__dirname, staticFolderName)));

// routes
const apiRouter = new express.Router();

app.use('/api', apiRouter);

apiRouter.get('/comments', (req, res, next) => {
    db['comments']
        .find({}, (err, comments) => {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        })
});

apiRouter.post('/comment', (req, res, next) => {
    const comment = req.body;
    db['comments']
        .save(comment, (err, comment) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(comment);
        })
});

apiRouter.get('/news', (req, res, next) => {
    db['main-news']
        .find({}, (err, news) => {
            if (err) {
                res.send(err);
            }
            res.json(news);
        })
});

apiRouter.get('/news/:uri', (req, res, next) => {
    db['main-news']
        .find({ uri: req.params.uri }, (err, news) => {
            if (err) {
                res.send(err);
            }
            res.json(news);
        })
});
apiRouter.get('/categories/:category', (req, res, next) => {
    db['main-news']
        .find({ category: req.params.category }, (err, news) => {
            if (err) {
                res.send(err);
            }
            console.log(news);
            res.json(news);
        })
});


// apiRouter.put('/news/:id', function(req, res, next) {
//     let comment = req.body.comment;
//     let updatedImage = { $push: { comments: comment } };

//     db['main-news'].update({ _id: mongojs.ObjectId(req.params.id) }, updatedImage, {},
//         (err, comment) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(comment);
//         })
// });
apiRouter.put('/news/:uri', function(req, res, next) {
    let comment = req.body.comment;
    let updatedImage = { $push: { comments: comment } };

    db['main-news'].update({ uri: req.params.uri }, updatedImage, {},
        (err, comment) => {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        })
});

apiRouter.get('/users', (req, res, next) => {
    db['users']
        .find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        })
});

apiRouter.post('/users', (req, res, next) => {
    const user = req.body;
    db['users']
        .save(user, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(user);
        })
});

// connection on port
const port = process.env.PORT || 3003;
app.listen(port);
console.log(`Server running on http://localhost:${port}`);
//require('openurl').open(`http://localhost:${port}`);