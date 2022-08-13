const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:uid', (req, res) => {
    let userId = req.params.uid;
    if (!userId) {
        res.sendStatus(401);
    }
    User.findOne({
        userId: userId
    })
        .then(user => {
            res.send(user);
        })
        .catch(err => res.status(500).send(err));
});

router.post('/:uid', (req, res) => {
    let userId = req.params.uid;
    if (!userId) {
        res.sendStatus(401);
    }
    const user = new User(req.body);

    user.save().then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.put('/:uid', (req, res) => {
    let userId = req.params.uid;
    if (!userId) {
        res.sendStatus(401);
    }
    User.findByIdAndDelete({ userId: userId }, req.data).then((user) => {
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/:uid', (req, res) => {
    let userId = req.params.uid;
    if (!userId) {
        res.sendStatus(401);
    }

    User.findOneAndDelete({ userId: userId })
        .then(res.sendStatus(200))
        .catch(e => {
            res.status(500).send(e);
        });
});

module.exports = router;