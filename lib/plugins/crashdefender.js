exports.Shield = function () {
    /**
    * Captures and logs uncaught exceptions.
    * @param {Error} err The error object.
    * @param {Object} origin The origin of the exception.
    */
    process.on('uncaughtException', (err, origin) => { console.log(err, origin); });

    /**
     * Captures and logs unhandled promise rejections.
     * @param {Error} reason The reason for the rejection.
     * @param {Promise} p The rejected promise.
     */
    process.on('unhandledRejection', (reason, p) => { console.log(reason, p); });
}