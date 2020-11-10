let gulp = require('gulp'),
    sass = require('gulp-sass'),//переменная sass и она несет все возможности плагина gulp-sass/require переводится как затребовать. нуждаться
    rename = require('gulp-rename'), //наделяем переменную силой плагина gulp-rename
    browserSync = require('browser-sync'),//обновление страницы переменную создаем и наделяем силой плагина
    autoprefixer = require('gulp-autoprefixer'),//префиксы ставит чтобы все браузеры понимали
    concat = require('gulp-concat'),//соединяет файлы в один файл
    uglify = require('gulp-uglify'),// сжимает файлы js
    cssmin = require('gulp-cssmin');//сжимает файлы css

  gulp.task('sass', function () {//задача task имя sass будет переводить препроцессор
    return gulp.src('app/scss/**/*.scss')//зайти в папку app / ищим файл с которым нужно провести операцию /ретерн это чтобы много раз шло обнавление информация при условии что мы вносим новую информацию /*-он будет брать в папке scss  все папки и все вложенности и будет их переводить преобразовывать в css
  .pipe(sass({ outputStyle: 'compressed' })) //метод sass происходит обработка и sass превращается в css попутно сжимается компресед
  .pipe(rename({suffix : '.min'})) //труба каторая будет переименововать его  
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))  
  .pipe(gulp.dest('app/css'))//куда это должно выльеться и будет называться не scss а css
  .pipe(browserSync.reload({stream: true}))// обнавление страницы для css
});    

gulp.task('style', function () {//собираем все файлы css 
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',//указываем путь до слика.css
    'node_modules/magnific-popup/dist/magnific-popup.css'// указываем путь до магнифика
  ])
    .pipe(concat('libs.min.css'))//обьединяем в один файл libs
    .pipe(cssmin())//сжимаем
    .pipe(gulp.dest('app/css'))//это куда выкидываем обединенный и сжатый файл тоесть css

});

gulp.task('script', function(){//собираем все файлы джс слик и магнифик
return gulp.src([
  'node_modules/slick-carousel/slick/slick.js',//указываем путь до слика.джс
  'node_modules/magnific-popup/dist/jquery.magnific-popup.js'// указываем путь до магнифика
])
     .pipe(concat('libs.min.js'))//обьединяем в один файл libs
  .pipe(uglify())//сжимаем с помощью углифи
    .pipe(gulp.dest('app/js'))//это куда выкидываем обединенный и сжатый файл тоесть в папке джс появился libs.min.js сжатый и обьединенный
     
});

gulp.task('html', function(){//новая задача которая будет выполнять функцию
  return gulp.src('app/*.html')//html файлы найти (* это индекс)  это любое имя файла.html
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function (){//новая задача которая будет выполнять функцию для js
  return gulp.src('app/js/*.js')//html файлы найти (*- это main)  это любое имя файла.html
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {//обнавляет страницу
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('watch', function(){//если происходит изменение в scss то выполняется таск gulp-sass тоесть нам не надо в ручную его запускать мы увидим изменения в style.min.css. написали в scss а изменения в style.min.css будут
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')) //за кем конкретно будем следить style.scss. если изменение то будет выполняться таск sass/вотчинг следит и если произошли изменения в html внесли инфу то обнавляется страница с помощью browser-sync
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))//запустить браузер синк и вотч вместе обнавить страницу и поменять информацию/ чтобы джс запускался автоматом пишим скрипт