import route from '!data/util/route'

export default async () => ({
  head: await route(import('!data/pug/_include/_head'))('articles'),
  ...(await route(import('!data/pug/_common'))()),
  ...(await articles()),
})

export const articles  = async () => {
  const manager = await route(import('!data/articles'))()
  return {
    allArticles: {
      type    : 'all',
      headline: '記事一覧',
      articles: manager.partial((article, submit, exit) => (
        submit(article) < 15 || exit()
      )),
    }
  }
}
