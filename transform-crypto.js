const
    Transform = require('stream').Transform,
    crypto = require('crypto');

module.exports = class TransfromCrypto extends Transform {
    constructor(options) {
        options = !options ? {} : options;
        options.objectMode = true;

        super(options);
        
        this.hash = crypto.createHash('md5');
    }

     _transform(chunk, encoding, callback) {
         this.hash.update(chunk.toString());
         
         callback();
     }
    
    _flush(callback) {  
        this.push(this.hash.digest('hex'));
        
        callback(); 
    }
}
