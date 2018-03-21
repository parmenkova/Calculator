const express = require('express')
const app = express()

app.get('/calculate', (req, res) => {
    let left = Number(req.query['left'])
    let right = Number(req.query['right'])
    const action = req.query['action']

    const errors = validate(action, left, right)

    if (errors.length > 0) {
        res.status(errors[0].status).json({ 'errors': errors }).send()
    } else {
        const result = calculate(action, left, right)
        res.status(200).json({ 'data': result }).send()
    }
})

app.listen(3000);

function validate(action, left, right) {
    let errors = [];
    if (!right) {
        errors = [
            {
                "status": "400",
                "title": "Missing parameter",
                "detail": "'right' operand must be supplied"
            }
        ]
    } else if (!left) {
        errors = [
            {
                "status": "400",
                "title": "Missing parameter",
                "detail": "'left' operand must be supplied"
            }
        ]
    } else if (isNaN(right)) {
        errors = [
            {
                "status": "422",
                "title": "Invalid parameter value",
                "detail": "'right' operand must be a number"
            }
        ]
    } else if (isNaN(left)) {
        errors = [
            {
                "status": "422",
                "title": "Invalid parameter value",
                "detail": "'left' operand must be a number"
            }
        ]
    } else if (action) {
        switch (action) {
            case 'add':
            case 'substract':
            case 'multiply':
            case 'divide': return errors
            default: errors = [
                {
                    "status": "422",
                    "title": "Invalid parameter value",
                    "detail": "'" + action + "'" + " is an unknown action"
                }
            ]
        }
    } else if (!action) {
        errors = [
            {
                "status": "400",
                "title": "Missing parameter",
                "detail": "parameter 'action' must be supplied"
            }
        ]
    }

    return errors
}

function calculate(action, left, right) {
    let result;
    switch (action) {
        case 'add': result = left + right
            break
        case 'substract': result = left - right
            break
        case 'multiply': result = left * right
            break
        case 'divide': result = left / right
            break
    }
    return result
}