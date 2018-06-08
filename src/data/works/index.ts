import Manager, {Article} from '!data/util/ArticleManager'
import route from '!data/util/route'
export default async () => {
  const dummy = await route(
    import('!data/pug/work/multi-row-tweet-deck'), 'article'
  )()

  const works  = [] as Article[]
  works.length = 21
  works.fill(dummy)
  return new Manager(works)
}
