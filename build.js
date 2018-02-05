const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const exorcist = require('exorcist');

const srcDir = __dirname;
const outputDir = path.join(__dirname, 'dist');

const outputDev = path.join(outputDir, 'devicehive.js');
const outputProd = path.join(outputDir, 'devicehive.min.js');
const mapDev = path.join(outputDir, 'devicehive.js.map');

const bundlerProd = browserify(path.join(srcDir, 'index-browser.js'));
const bundlerDev = browserify(path.join(srcDir, 'index-browser.js'), {
    debug: true
});

// Creating dist directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// preset

bundlerProd
    .transform('babelify')
    .transform('uglifyify', {
        global: true,
        sourceMap: true
    });

bundlerDev
    .transform('babelify');

// build

bundlerProd.bundle()
    .pipe(fs.createWriteStream(outputProd), 'utf8')
    .on('finish', () => {
        console.log('\x1b[36m%s\x1b[0m', 'Production build complete!');
    });

bundlerDev.bundle()
    .pipe(exorcist(mapDev))
    .pipe(fs.createWriteStream(outputDev), 'utf8')
    .on('finish', () => {
        console.log('\x1b[36m%s\x1b[0m', 'Development build complete!');
    });