var gulp 			= require('gulp');
var less 			= require('gulp-less');
var browserSync 	= require('browser-sync').create();
var connect 		= require('gulp-connect');
//var minifyCss 		= require('gulp-minify-css');
var rename 			= require('gulp-rename');
var autoprefixer 	= require('gulp-autoprefixer');
var image 			= require('gulp-image');
var gutil    		= require('gulp-util');
var uglify			= require('gulp-uglifyjs');
var concat  		= require('gulp-concat');
var jshint 			= require('gulp-jshint');
var gzip			= require('gulp-gzip');
var bootlint		= require('gulp-bootlint');

// static webserver
gulp.task('webserver', ['less'], function(){
	browserSync.init({
		server: "../code/"
	});
	gulp.watch('bootstrap/build--less', ['less']);
	gulp.watch('bootstrap/build--less/').on(
		'change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});


//gulp less
gulp.task('less', function(){
	return gulp.src('bootstrap/build--less/main.less')
		.pipe(less())
		.pipe(autoprefixer({
			browser: ['last 2 version'],
			cascade: false
		}))
		.pipe(gulp.dest('bootstrap/public/css/'))
		// .pipe(connect.reload());
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('bootlint', function(){
	return gulp.src('./index.html')
		.pipe(bootlint({
			stoponerror: true,
            stoponwarning: true,
            loglevel: 'debug',
            disabledIds: ['W009', 'E007'],
            reportFn: function(file, lint, isError, isWarning, errorLocation) {
                var message = (isError) ? "ERROR! - " : "WARN! - ";
                if (errorLocation) {
                    message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
                } else {
                    message += file.path + ': ' + lint.id + ' ' + lint.message;
                }
                console.log(message);
            },
            summaryReportFn: function(file, errorCount, warningCount) {
                if (errorCount > 0 || warningCount > 0) {
                    console.log("please fix the " + errorCount + " errors and "+ warningCount + " warnings in " + file.path);
                } else {
                    console.log("No problems found in "+ file.path);
                }
            }
		}));
	});

/*
gulp.task('sourcemap', function(){
	return gulp.src('bootstrap/build--less/main.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('bootstrap/public/css/'))
});
*/
///autoprefixer
/*
gulp.task('default', function(){
	return gulp.src('bootstrap/less/main.less')
		.pipe(autoprefixer({
			browser: ['last 2 version'],
			cascade: false
		}))

 .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest('bootstrap/dist/css/'));
});
*/

// gulp js
gulp.task('js-lib', function () {
    gulp.src('bootstrap/dist/js/*.js')
        .pipe(uglify('complete.js',{
        	outSourceMap: true
        }))
        //.pipe(gzip())
        .pipe(gulp.dest('bootstrap/public/js/'));
});

gulp.task('js-only', function(){
	gulp.src('bootstrap/public/my-js/*.js')
	.pipe(uglify('all.js',{
		outSourceMap: true
		}))
	//.pipe(gzip())
	.pipe(gulp.dest('bootstrap/public/js/'));
});




gulp.task('lint', function(){
	return gulp.src(['bootstrap/dist/js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});



//livereload
gulp.task('css', function(){
	gulp.src('bootstrap/public/css/*.css')
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('*.html')
		.pipe(connect.reload());
});

//css minify
/*
gulp.task('minify-css', function(){
	return gulp.src('bootstrap/public/css/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: '.min'
			}))
		.pipe(gulp.dest('bootstrap/public/css'));
});


gulp.task('images', function(){
	return gulp.src('bootstrap/public/img/*')
		.pipe(image({
			pngquant: true,
      		optipng: false,
      		zopflipng: true,
      		advpng: true,
      		jpegRecompress: false,
      		jpegoptim: true,
      		mozjpeg: true,
      		gifsicle: true,
      		svgo: true
		}))
		.pipe(gulp.dest('bootstrap/public/img--min'));
});

*/


gulp.task('compress', function(){
	gulp.src('bootstrap/public/css/*.css')
	.pipe(gzip())
	.pipe(gulp.dest('./bootstrap/public/css'));

});




gulp.task('watch', function(){
	gulp.watch('bootstrap/build--less/*.less', ['less']);
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['bootstrap/public/css/*.css'], ['css']);
	//gulp.watch('bootstrap/public/cssmin/*.css', ['minify-css']);
	gulp.watch('bootstrap/dist/js/*.js', ['js-lib']);
	gulp.watch('bootstrap/public/my-js/*.js', ['js-only']);
	gulp.watch('bootstrap/less/*.less', ['default']);
gulp.watch('bootstrap/public/img/*', ['images']);
});

gulp.task('default', ['less','webserver', 'watch', /*'minify-css',*/ 'js-lib', 'js-only' /*,'images', 'compress'*/]);