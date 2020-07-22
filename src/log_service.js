const log4js = require('log4js');

class LogService {
    constructor(config) {
        log4js.configure(config);
    }

    getLogger(name) {
        const logger = log4js.getLogger(name);

        return logger;
    }
}
module.exports = LogService;
