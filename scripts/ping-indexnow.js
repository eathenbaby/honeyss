/**
 * Automatically pings IndexNow when updating assets (e.g. photos/portfolio)
 * Run this script using Node.js: `node scripts/ping-indexnow.js`
 */
const https = require('https');

// IndexNow configuration for Honey Bridal Website
const HOST = 'api.indexnow.org';
const HOST_URL = 'https://www.honeybridal.com';
const KEY = '25f6c8d7e9b041a2';
const KEY_LOCATION = 'https://www.honeybridal.com/25f6c8d7e9b041a2.txt';

// Example URLs that were updated and need indexing
// In a full implementation, this could read from assets.json or a dynamic generator
const urlList = [
    'https://www.honeybridal.com/',
    'https://www.honeybridal.com/#portfolio-hindu',
    'https://www.honeybridal.com/#portfolio-christian',
    'https://www.honeybridal.com/#portfolio-muslim'
];

const data = JSON.stringify({
    host: HOST_URL.replace(/^https?:\/\//, ''),
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
});

const options = {
    hostname: HOST,
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
    }
};

console.log('Pinging IndexNow to update search engines...');

const req = https.request(options, (res) => {
    console.log(`IndexNow Ping Status: ${res.statusCode}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✅ Successfully submitted to IndexNow.');
    } else {
        console.log('⚠️ Submission failed. See response code above.');
    }

    res.on('data', (chunk) => {
        if (chunk.toString().trim()) {
            console.log(`Response Body: ${chunk}`);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
