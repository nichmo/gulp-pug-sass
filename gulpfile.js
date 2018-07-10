
const gulp = require('gulp');
const sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      plumber = require('gulp-plumber'),
      browserSync = require('browser-sync'),
      notify = require('gulp-notify');

gulp.task('default', ['sass', 'browser-sync', 'pug', 'watch'])

// 監視：コード変化時更新する
gulp.task('watch', () => {
  gulp.watch(['./sass/**'], () => {
    gulp.setMaxListeners(['sass']);
  });
  gulp.watch(['./pug/**'], () => {
    gulp.setMaxListeners(['pug']);
  });
});

//ブラウザ表示
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './'  //サーバとなるrootディレクトリ
    }
  });
  // ファイルの監視
  // 以下のファイルが変わったらリロードする
  gulp.watch('./js/**/*.js',  ['reload']);
  gulp.watch('./*.html',      ['reload']);

});

gulp.task('pug', () => {
  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./html/'))
})
