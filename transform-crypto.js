const
    Transform = require('stream').Transform,
    crypto = require('crypto');

module.exports = class TransfromCrypto extends Transform {
    constructor(options) {
        options = !options ? {} : options;
        options.objectMode = true;

        super(options);
    }

    _transform(chunk, encoding, callback) {
        let hash = chunk ? crypto.createHash('md5').update(chunk.toString()).digest('hex') : null;

        this.push(hash);

        callback();
    }
}