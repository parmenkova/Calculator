const express = require('express')
const app = express()

app.get('/calculate', (req, res) => {
    const left = + req.query['left']
    const right = + req.query['right']
    const action = req.query['action']

    if (isNaN(right)) {
        res.status(400).json({
            "errors": [
                {
                    "status": "400",
                    "title": "Missing parameter",
                    "detail": "'right' operand must be supplied"
                }
            ]
        });
        return
    }

    if (isNaN(left)) {
        res.status(400).json({
            "errors": [
                {
                    "status": "400",
                    "title": "Missing parameter",
                    "detail": "'left' operand must be supplied"
                }
            ]
        });
        return
    }

    let result = 0

    if (action) {
        switch (action) {
            case 'add': result = left + right
                break
            case 'substract': result = left - right
                break
            case 'multiply': result = left * right
                break
            case 'divide': result = left / right
                break
            default: res.status(422).json({
                "errors": [
                    {
                        "status": "422",
                        "title": "Invalid parameter value",
                        "detail": "'" + action + "'" + " is an unknown action"
                    }
                ]
            });
                return
        }
    } else {
        res.status(400).json({
            "errors": [
                {
                    "status": "400",
                    "title": "Missing parameter",
                    "detail": "parameter 'action' must be supplied"
                }
            ]
        });
        return
    }

    res.status(200).json({ 'data': result })
})

app.listen(3000)