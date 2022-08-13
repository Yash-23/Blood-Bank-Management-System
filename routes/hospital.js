const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

router.get('/:hid', (req, res) => {
    const hospitalId = req.params.hid;
    if (!hospitalId) res.sendStatus(401);

    Hospital.findOne({ hospitalId: hospitalId }).then(res.send).catch(res.send);
});

router.post('/:hid', (req, res) => {
    const hospitalId = req.params.hid;
    if (!hospitalId) res.sendStatus(401);

    let hospital = new Hospital(req.data);
    hospital.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.put('/:hid', (req, res) => {
    const hospitalId = req.params.hid;
    if (!hospitalId) res.sendStatus(401);

    Hospital.findOneAndUpdate({ hospitalId: hospitalId }, res.data)
        .then(res.send)
        .catch(e => {
            res.status(500).send(e);
        });
});

router.delete('/:hid', (req, res) => {
    const hospitalId = req.params.hid;
    if (!hospitalId) res.sendStatus(401);

    Hospital.findOneAndDelete({ hospitalId: hospitalId })
        .then(res.sendStatus(200))
        .catch(e => {
            res.status(500).send(e);
        });
});

module.exports = router;