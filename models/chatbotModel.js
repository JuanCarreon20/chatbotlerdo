const db = require('../config/database');

const getUniversityInfo = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM university_info LIMIT 1', (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result[0]);
        });
    });
};

const getCareersInfo = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM courses', (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getUniversityInfo,
    getCareersInfo
};
