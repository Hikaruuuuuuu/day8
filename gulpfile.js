
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    server = require('gulp-webserver'),
    list = require('./mock/shop'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

gulp.task('sass', ()=>{
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('server', ()=>{
    return gulp.src('src')
        .pipe(server({
            port: 8000,
            livereload: true,
            middleware: (req, res, next)=>{
                pathname = url.parse(req.url).pathname;

                if(pathname == '/favicon.ico'){
                    return res.end()
                }

                if(pathname == '/api/getlist'){
                    res.end(JSON.stringify({code: 1, data: list}))
                }else{
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

gulp.task('watch', ()=>{
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))