const express = require('express')
const app = express()

app.get('/calculate', (req, res) => {
    const left = + req.query['left']
    const right = + req.query['right']
    const action = req.query['action']

    let result = 0;

    switch (action) {
        case 'add': result = left + right;
        break;
        case 'substract': result = left - right;
        break;
        case 'multiply': result = left * right;
        break;
        case 'divide': result = left / right;
        break;
    }

    res.status(200).json({'data': result});
})

app.listen(3000)