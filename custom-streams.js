const
    stream = require('stream'),

    random = require('./random');

module.exports = {
    Readable: class Readable extends stream.Readable {
        constructor(range, options) {
            options = !options ? {} : options;
            options.objectMode = true;

            super(options);

            this.range = range;
        }

        _read(size) {
            let number = random(this.range.start, this.range.end);

            this.push(number);
        }
    },

    Transform: class Transform extends stream.Transform {
        constructor(modify, options) {
            options = !options ? {} : options;
            options.objectMode = true;

            super(options);

            this.modify = typeof modify === 'function' ? modify : val => val * val;
        }

        _transform(chunk, encoding, callback) {
            setTimeout(
                () => {
                    this.push(
                        this.modify(chunk)
                    );
                    callback();
                },
                1000
            );
        }
    },

    Writable: class Writable extends stream.Writable {
        constructor(options) {
            options = !options ? {} : options;
            options.objectMode = true;

            super(options);
        }

        _write(chunk, encoding, callback) {
            console.log(chunk.toString());
            callback();
        }
    }
}