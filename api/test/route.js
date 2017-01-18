const http = require('http');

var dataToTest = [{
    name: '/login',
    requestType: 'POST',
    tests: [
        {
            params: {login: "munsch", password: "helloworld"},
            expectedStatus: 200
        }, {
            params: {login: "munsch", password: "bite"},
            expectedStatus: 404
        }, {
            params: {login: "test", password: "bite"},
            expectedStatus: 404
        }, {
            params: {login: "fuckof", password: "helloworld"},
            expectedStatus: 404
        },
    ]}
];

function createGenericHTTPoption(method, path) {
    return {
        hostname: '86.70.224.226',
        port: 4242,
        method: method,
        path: path,
        headers: {
            'Content-Type': 'application/json',
        }
    };
}

function sendRequest(option, body, test) {
    var req = http.request(option, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            checkResponse(chunk, test);
        });
    });
    req.write(body);
    req.end();
}

function checkResponse(chunk, test) {
    const response = JSON.parse(chunk);
    if (response.status != test.expectedStatus) {
        console.log(`Response: ${response.message}`);
    } else {
        console.log('Result expected');
    }
}

// main

dataToTest.forEach((route) => {
    var option = createGenericHTTPoption(route.requestType, route.name);
    route.tests.forEach((test) => {
        var body = JSON.stringify(test.params);
        if (option.method != 'GET') {
            option.headers['Content-Length'] = Buffer.byteLength(body);
        }
        sendRequest(option, body, test);
    });
});

