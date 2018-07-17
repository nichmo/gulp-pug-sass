const 
  gulp = require('gulp')
  sass = require('gulp-sass')
  postcss = require('gulp-postcss')
  autoprefixer = require('autoprefixer')
  flexBugsFixes = require('postcss-flexbugs-fixes')
  cssWring = require('csswring')
  pug = require('gulp-pug')
  htmlmin = require('gulp-htmlmin')

const
  autoprefixerOption = {
    grid: true
  }
  htmlminOption = {
    collapseWhitespace: true
  }

const
  postcssOption = [
    flexBugsFixes,
    autoprefixer(autoprefixerOption),
    // cssWring
    // ↑をやるとめっちゃ圧縮される
  ]

gulp.task('default', () => {
  console.log('test')
})

//scssファイルの場合はこちらを使う
// gulp.task('sass', () => {
//   return gulp.src('./src/sass/**/*.scss')
//     .pipe(sass({outputStyle: 'expanded'}))
//     //compactを選択すると1行になる
//     .pipe(postcss(postcssOption))
//     .pipe(gulp.dest('./dist/css'));
// })

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(postcssOption))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('pug', () => {
  return gulp.src('./src/pug/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    // .pipe(htmlmin(htmlminOption))
    // ↑これ使うとめっちゃ圧縮される
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', () => {
  gulp.watch('./src/sass/**/*.sass', gulp.series('sass'))
  gulp.watch('./src/pug/**/*.pug', gulp.series('pug'))
})

