import markdown   from '!data/util/markdown'
import fs   = require('fs')
import path = require('path')

export default (dirname: string) =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(
      path.join(dirname, 'content.md'),
      (err, data) => err ? reject(err) : resolve(data.toString())
    )
  ).then(
    content => markdown(content)
  )
