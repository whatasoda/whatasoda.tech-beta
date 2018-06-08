import route      from '!data/util/route'
import content    from '!data/util/content'
import {Article}  from '!data/util/articleManager'

export default async () => {
  const _article = await article()
  return {
    head: await route(import('!data/pug/_include/_head'))(_article.title),
    ...(await route(import('!data/pug/_extends/_detail'))()),
    article: _article,
  }
}

export const article = async () => ({
  title     : 'ぼくがかんがえた\nさいきょうの\nTypeScript型ツール',
  thumbnail : '/img/test_thumbnail.jpg',
  url       : '/article/strongest-type-tool.html',
  isOld     : true,
  update    : '2016/06/07/16:00',
  date      : '2016-06-07-16-00',
  categories: [
    { name: 'TypeScript', url: 'category/typescript' },
    { name: 'Node.js', url: 'category/node-js' },
  ],
  content: await content(__dirname)
} as Article)
