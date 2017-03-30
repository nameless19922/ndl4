const
    fs = require('fs'),
    crypto = require('crypto'),

    CustomStreams = require('./custom-streams'),
    TransfromCrypto = require('./transform-crypto');	

const
    args = process.argv.slice(2),

    app = {
        main: args => {
            const
                input = fs.createReadStream('input.txt'),
                output = fs.createWriteStream('output.txt'),

                hash = crypto.createHash('md5'),

                transform = new TransfromCrypto();

            if (typeof args[1] === 'string') {
                switch (args[1]) {
                    case 'first':
                        hash.setEncoding('hex');
                        input.pipe(hash);

                        hash.pipe(process.stdout);
                        hash.pipe(output);

                        break;

                    case 'second':
                        input.pipe(transform);

                        transform.pipe(process.stdout);
                        transform.pipe(output);

                        break;

                    default:
                        console.log('"node index main - bad params"');

                        break;
                }
            } else {
                console.log('"node index main - bad params"');
            }

        },

        add: args => {
            const
                rstream = new CustomStreams.Readable({
                    start: 1,
                    end: 1000
                }),
                tstream = new CustomStreams.Transform(val => {
                    return val * val - 1;
                }),
                wstream = new CustomStreams.Writable();

            rstream
                .pipe(tstream)
                .pipe(wstream);
        }
    };


if (args.length) {
    app.hasOwnProperty(args[0]) ? app[args[0]](args) : console.log('bad params: main or add');
} else {
    console.log('"node index" - help');
    console.log('"node index main <type>" - main task, <type>: first or second');
    console.log('"node index add" - Additional task');
}