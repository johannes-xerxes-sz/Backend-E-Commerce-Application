const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalURL}`)
    next();
}

module.exports = logger;
