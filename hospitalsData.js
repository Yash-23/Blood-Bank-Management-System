const axios = require('axios').default;

module.exports = function () {
    return axios({
        method: 'get', url: 'http://www.communitybenefitinsight.org/api/get_hospitals.php'
    });
};
// index.js
const hospitals = require('./hospitalsData');

hospitals().then(async (r) => {
    const Hospital = require('./models/Hospital');

    function getRandom(arr, n) {
        var result = new Array(n), len = arr.length, taken = new Array(len);
        if (n > len) throw new RangeError('getRandom: more elements taken than available');
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[ n ] = arr[ x in taken ? taken[ x ] : x ];
            taken[ x ] = --len in taken ? taken[ len ] : len;
        }
        return result;
    }

    for (const dataKey of r.data) {
        console.log(dataKey);
        let s = Math.floor((Math.random() * 2) + 2);
        let b = Math.floor((Math.random() * 4) + 5);
        let sa = ['emergency', 'blood-bank', 'others'];
        let ba = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
        let h = new Hospital({
            hospitalId: dataKey.hospital_id,
            emailAddress: null,
            name: dataKey.name,
            phoneNumber: dataKey.medicare_provider_number,
            zip: dataKey.zip_code,
            state: dataKey.state,
            county: dataKey.county,
            hospitalBedCount: dataKey.hospital_bed_count,
            FipsStateAndCountryCode: dataKey.fips_state_and_county_code,
            availableServices: getRandom(sa, s),
            bloodBank: getRandom(ba, b)
        });
        await h.save().catch(e => {
            console.log(dataKey);
            throw new Error(e);
        });
    }
});