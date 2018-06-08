import route from '!data/util/route'
import Manager, {Article} from '!data/util/ArticleManager'

export default async () => {
  const dummy = await route(
    import('!data/pug/article/strongest-type-tool'), 'article'
  )()

  const articles  = [] as Article[]
  articles.length = 21
  articles.fill(dummy)
  return new Manager(articles)
}
