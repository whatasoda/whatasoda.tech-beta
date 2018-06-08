import route from '!data/util/route'

export default async () => ({
  head: await route(import('!data/pug/_include/_head'))('works'),
  ...(await route(import('!data/pug/_common'))()),
  ...(await works()),
})

export const works = async () => {
  const manager = await route(import('!data/works'))()
  return {
    works: {
      type    : 'works',
      headline: '制作物一覧',
      articles: manager.partial((article, submit, exit) =>
        (submit(article) < 15 || exit()
      )),
    }
  }
}
