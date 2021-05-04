const express = require('express');
const router = express.Router();
const Fetch = require('node-fetch');
const path = require('path');
const parse = require('csv-parse');
const fs = require('fs');

const CSV_FILE_PATH = path.join(__dirname, '../db/Domains_Imprint_Parser.csv');

router.get('/fetchHtml', (req, res, next) => {
    Fetch(req.query.url)
        .then(res => res.text())
        .then(data => {
            //console.log(data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
        .catch(err => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.send(err);
        })
})

router.get('/urlList', (req, res, next) => {
    var urlList = [];
    fs.createReadStream(CSV_FILE_PATH)
        .pipe(parse({ delimiter: ',' }))
        .on('data', function (row) {
            urlList.push({ "url": row[0] });
        })
        .on('end', function () {
            //console.log(urlList);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(urlList);
        });
})

module.exports = router;