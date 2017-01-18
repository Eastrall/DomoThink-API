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

dataToTest.forEach((route) => {
    var option = {
        hostname: '86.70.224.226',
        port: 4242,
        method: `${route.requestType}`,
        path: `${route.name}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    route.tests.forEach((test) => {
        var body = JSON.stringify(test.params);
        option.headers['Content-Length'] = Buffer.byteLength(body);
        var req = http.request(option, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const response = JSON.parse(chunk);
                if (response.status != test.expectedStatus) {
                    console.log(`Response: ${response.message}`);
                } else {
                    console.log('Result expected');
                }
            });
        });
        req.write(body);
        req.end();
    });
});



