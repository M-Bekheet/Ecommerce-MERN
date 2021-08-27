const chalk = require('chalk')

const hasAuth = (req, res, next) => {
    try {
        req.session.userID ? next() : res.status(400).send('Not Authenticated')
    } catch (err) {
        console.log(chalk.red(err))
        res.send(400).send('Not Authenticated!!!')
    }
}

module.exports = hasAuth