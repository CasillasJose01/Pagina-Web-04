const {series, src , dest,watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades Css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades Js
const terser=require('gulp-terser-js');
const rename = require('gulp-rename');


const paths={
    imagenes: 'src/img/**/*',
    scss:'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}
//Funcion que compila SASS
function css(){
    return src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe( sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('./build/css') )
}
function minificarcss(){
    return src('src/scss/app.scss')
    .pipe( sass({
        outputStyle: 'compresed'
    })
    )
    
    .pipe( dest('./build/css'))
}

function javascript(){
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundel.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))  
    .pipe(rename({sufix: '.min'}))  
    .pipe(dest('./build/js'))
}

function imagenes(){
    return src(paths.imagenes)//Busca todas las imagenes de todos los formatos de la carpeta    
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Version webP Lista'}));
}



function watchArchivos(){
    watch( 'src/scss/**/*.scss',css); //*= Carpeta acutal 
    //** =Todos los archivos con esa extension */
    watch(paths.js,javascript); 
}
exports.css = css;
exports.minificarcss=minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series( css, imagenes, javascript ,versionWebp ,watchArchivos);

