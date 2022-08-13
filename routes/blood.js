const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

router.get('/', (req, res) => {
    console.log(req.query);
    let { zip, blood, emg } = req.query;
    let format = /[a-zA-Z ]/g;
    let sign = blood.replace(format, '');
    Hospital.find({
        zip: {
            '$lt': parseInt(zip) + 1000, '$gt': parseInt(zip) - 1000
        }
    })
        .then(hospitals => {
            let requirement = hospitals.filter((h) => {
                let isEmg = emg === 'true' ? h.availableServices.includes('emergency') : true;
                let isBlood;
                for (const bloodBankElement of h.bloodBank) {
                    isBlood = bloodBankElement.includes(blood) || bloodBankElement.includes(`O${sign}`);
                }
                return isEmg && isBlood;
            });
            res.send(requirement);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

module.exports = router;