import route      from '!data/util/route'
import content    from '!data/util/content'
import {Article}  from '!data/util/ArticleManager'

export default async () => {
  const _article = await article()
  return {
    head: await route(import('!data/pug/_include/_head'))(_article.title),
    ...(await route(import('!data/pug/_extends/_detail'))()),
    article: _article,
  }
}

export const article = async () => ({
  title     : 'Multi Row TweetDeck',
  thumbnail : '/img/multi-row-tweet-deck.png',
  url       : '/work/multi-row-tweet-deck.html',
  isOld     : false,
  update    : '2018/06/07/16:00',
  date      : '2018-06-07-16-00',
  categories: [
    { name: 'TypeScript', url: 'category/typescript' },
    { name: 'React.js', url: 'category/react-js' },
  ],
  content: await content(__dirname)
} as Article)
