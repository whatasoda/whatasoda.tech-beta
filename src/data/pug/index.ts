import route from '!data/util/route'
export default async () => ({
  isTop: true,
  head: await route(import('!data/pug/_include/_head'))(),
  ...(await route(import('!data/pug/_common'))()),
  ...(await articles())
})

const articles  = async () => {
  const manager = await route(import('!data/articles'))()
  return {
    pickUpArticles: {
      type    : 'pick-up',
      headline: 'ピックアップ記事',
      articles: manager.partial((article, submit, exit) => (
        submit(article) < 3 || exit()
      )),
    },
    recentArticles: {
      type    : 'recent',
      headline: '新着記事',
      articles: manager.partial((article, submit, exit) =>
        (submit(article) < 9 || exit()
      )),
      more: true,
    }
  }
}
