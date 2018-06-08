import * as Vinyl         from 'vinyl'
import * as path          from 'path'
import * as clearRequire  from 'clear-require'
import * as globToRegexp  from 'glob-to-regexp'

const data = async function (
  filePath      : string,
  rootSrc       : string,
  forcedUpdate? : boolean
) {
  if (forcedUpdate || !box[filePath]) {
    const { dir, name } = path.parse( path.relative(rootSrc, filePath) )
    const dataSrc = './' + path.join(dir, name)
    box[filePath] = name ? (await import(dataSrc)).default() : null
  }
  return box[filePath]
}

const box: { [key: string]: object } = {}

module.exports = (rootSrc: string) => {
  const dataFunc =
    (file: Vinyl, callback: DataFuncCallback) => (
      data(file.path, rootSrc)
        .then(data => data ? callback(undefined, data) : callback('failed'))
    )
  const reload: DataFunc['reload'] =
    (reloadGlob: string) => (
      reloadMatched(globToRegexp(reloadGlob, { globstar: true }))
    )
  const reloadMatched: DataFunc['reloadMatched'] =
    (re: RegExp) => Promise.all(
      [clearRequire.match(re)] && Reflect.ownKeys(box)
        .map(key => typeof key === 'string' ? key : '')
        .map(async key => !!(key && await data(key, rootSrc, true)))
    )
  ;(dataFunc as DataFunc).reload = reload
  ;(dataFunc as DataFunc).reloadMatched = reloadMatched
  return dataFunc as DataFunc
}

interface DataFunc {
  (file: Vinyl, callback: DataFuncCallback): Promise<void>
  reload (reloadGlob: string): Promise<boolean[]>
  reloadMatched (re: RegExp): Promise<boolean[]>
}

type DataFuncCallback = (err: string | undefined, data?: object) => void
