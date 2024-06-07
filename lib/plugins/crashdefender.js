function Shield() {
    process.on(
        'uncaughtException',
        (err, origin) => {
            console.log(err, 
                origin)
        }
        )
    process.on(
        'unhandledRejection',
        (reason, p) => {
            console.log(reason,
                 p)
        }
        )
}

module.exports = { Shield }