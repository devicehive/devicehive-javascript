const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const exorcist = require('exorcist');

const srcDir = __dirname;
const outputDir = path.join(__dirname, 'dist');

const outputProd = path.join(outputDir, 'devicehive.min.js');
const outputDev = path.join(outputDir, 'devicehive.js');
const mapDev = path.join(outputDir, 'devicehive.js.map');

const bundlerProd = browserify(path.join(srcDir, 'index-browser.js'));
const bundlerDev = browserify(path.join(srcDir, 'index-browser.js'), {
    debug: true
});

const encoding = 'utf8';

// Creating dist directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// preset

bundlerProd
    .transform('babelify')
    .plugin('tinyify', {
        flat: false,
        uglifyOpts: {
            global: true,
            sourceMap: true
        }
    });

bundlerDev
    .transform('babelify');

bundlerDev
    .transform('babelify');

// build

bundlerProd.bundle()
    .pipe(fs.createWriteStream(outputProd), encoding)
    .on('finish', () => {
        console.log('\x1b[36m%s\x1b[0m', 'Production build complete!');
    });

bundlerDev.bundle()
    .pipe(exorcist(mapDev))
    .pipe(fs.createWriteStream(outputDev), encoding)
    .on('finish', () => {
        console.log('\x1b[36m%s\x1b[0m', 'Development build complete!');
    });