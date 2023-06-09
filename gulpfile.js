const gulp = require('gulp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminZopfli = require('imagemin-zopfli');

// 每次編譯前先移除原有檔案
function clean() {
    return del(['export']);
  }

function imageMin(cb) {
    // console.log('hello world');
    gulp.src('images/*')
    gulp.src('images/*.{gif,png,jpg,jpeg,svg}')
        .pipe(imagemin([
            // png lossless, zopfli or optipng choose one
            imageminZopfli({
                more: true
            }),
            // png lossy
            imageminPngquant({
                // speed: 1,
                quality: [0.7, 0.8]
            }),

            // imagemin.optipng({optimizationLevel: 4}),

            // gif lossless
            imagemin.gifsicle({interlaced: true}),

            // svg
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            }),

            // jpg lossless
            imageminJpegtran({
                progressive: true
            }),
            // jpg lossy
            // imagemin.mozjpeg({quality: 70, progressive: true}),
        ],{
            verbose: true
        }))
        .pipe(gulp.dest('export/'))
    cb();
}

exports.clean = clean;
exports.imageMin = imageMin;

const img = gulp.series(clean, imageMin);

// deploy product
gulp.task('img', gulp.series(clean, imageMin));
