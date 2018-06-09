const gulp          = require('gulp')
const server        = require('browser-sync').create()
const plumber       = require('gulp-plumber')
const path          = require('path')
const data          = require('gulp-data')
const cp            = require('child_process')

const sass          = require('gulp-sass')
const sassGlob      = require('gulp-sass-glob')

const pug           = require('gulp-pug')
const pugGlob       = require('pug-include-glob')
const attrPrefixer  = require('gulp-html-attr-xxxfixer')

const image         = require('gulp-image')

const isDev = process.env.NODE_ENV !== 'docs'

const PATH = {
  root: {
    src : './src',
    dist: isDev ? './dist' : './docs'
  },
  data: {},
  scss: {},
  pug: {},
  img: {},
}
const i = path => `!${path}` // ignore

const dataFunc = require('./src/data')(PATH.root.src)

PATH.data.baseDir   = path.join(PATH.root.src, 'data')
PATH.data.pug       = path.join(PATH.data.baseDir , 'pug/**/*.ts')
PATH.data.articles  = path.join(PATH.data.baseDir , 'articles/**/*.ts')
PATH.data.works     = path.join(PATH.data.baseDir , 'works/**/*.ts')

PATH.scss.baseDir = path.join(PATH.root.src, 'scss')
PATH.scss.dist    = path.join(PATH.root.dist, 'css')
PATH.scss.src     = path.join(PATH.scss.baseDir, 'style.scss')
PATH.scss.watch   = path.join(PATH.scss.baseDir, '**/*.scss')

PATH.pug.baseDir  = path.join(PATH.root.src, 'pug')
PATH.pug.dist     = PATH.root.dist
PATH.pug.src      = [
    path.join(PATH.pug.baseDir, '**/*.pug'),
  i(path.join(PATH.pug.baseDir, '**/_*.pug')),
]
PATH.pug.watch    = path.join(PATH.pug.baseDir  , '**/*.pug')

PATH.img.baseDir  = path.join(PATH.root.src,    'img')
PATH.img.dist     = path.join(PATH.root.dist,   'img')
PATH.img.src      = path.join(PATH.img.baseDir, '**/*')
PATH.img.watch    = path.join(PATH.img.baseDir, '**/*')

gulp.task('scss', () => (
  gulp.src(PATH.scss.src)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest(PATH.scss.dist))
))


gulp.task('pug', () => {
  const common = gulp.src(PATH.pug.src)
    .pipe(plumber())
    .pipe(data(dataFunc))
    .pipe(pug({
      basedir: path.join(__dirname, PATH.pug.baseDir),
      plugins: [ pugGlob() ],
    }))
  return (isDev ? common : common.pipe(attrPrefixer(attrPrefixer.prefix('/whatasoda.tech-beta', ['href', 'src']))))
    .pipe(gulp.dest(PATH.pug.dist))
})

gulp.task('img', () => (
  gulp.src(PATH.img.src)
    .pipe(plumber())
    .pipe(image())
    .pipe(gulp.dest(PATH.img.dist))
))

const DataReloaders = {}
const dataReloader = (type, post_tasks) => {
  if (DataReloaders[type]) return DataReloaders[type]
  let watched = false
  const src   = PATH.data[type]
  const name  = `data-reload:${type}`
  const task  = () => dataFunc.reload(path.join(__dirname, src))
  const watch = () => watched = watched || !![
    gulp.watch(src, gulp.series(name, ...post_tasks))
  ]
  gulp.task(name, task)
  return DataReloaders[type] = { src, name, task, watch }
}
dataReloader('pug'      , ['pug', 'reload'])
dataReloader('articles' , ['pug', 'reload'])
dataReloader('works'    , ['pug', 'reload'])

gulp.task('browserSync', async () => {
  server.init({
    server: { baseDir: './dist' },
    // injectChanges: false
    reloadDelay: 1000

  })
})

gulp.task('reload', async () => server.reload())

gulp.task('watch', async () => {
  gulp.watch(PATH.scss.watch      , gulp.series('scss', 'reload'))
  gulp.watch(PATH.pug.watch       , gulp.series('pug', 'reload'))
  gulp.watch(PATH.img.watch       , gulp.series('img', 'reload'))
  dataReloader('pug').watch()
  dataReloader('articles').watch()
  dataReloader('works').watch()
})


gulp.task('default', gulp.series(
  gulp.parallel(
    'watch',
    'scss',
    'pug',
    'img',
    'browserSync'
  )
))
