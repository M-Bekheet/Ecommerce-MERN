const chalk = require('chalk')

const isAuth = (req, res, next) => {
    try {
        req.session.userID ? next() : res.status(400).send('Not Authenticated')
    } catch (err) {
        console.log(chalk.red(err))
        res.send(401).send('Not Authenticated!!!')
    }
}

const isAdmin = (req, res, next) => {
    try {
        (req.session.userID && req.session.isAdmin) ? next(): res.status(400).send('Not Authenticated')
    } catch (err) {
        console.log(chalk.red(err))
        res.send(401).send('Not Authorized!!!')
    }
}


module.exports = {
    isAuth,
    isAdmin
}