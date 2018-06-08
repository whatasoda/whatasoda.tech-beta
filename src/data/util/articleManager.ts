import markdown from './markdown'


export default class ArticleManager {
  public  articles: Article[]
  private partialCache: { [key: string]: Article[] } = {}

  constructor (articles: Article[]) {
    this.articles = articles
  }

  public partial(
    validator     : PartialValidator,
    key          ?: string,
    forceUpdate  ?: boolean
  ) {
    if (key && this.partialCache[key] && !forceUpdate) return this.partialCache[key]
    const submitted = [] as Article[]
    const submit    = (article: Article) => submitted.push(article)
    const exit      = () => (willExit = true)
    let willExit    = false
    for (let i=0; i<this.articles.length; i++) {
      validator(this.articles[i], submit, exit, i, this.articles, submitted)
      if (willExit) break;
    }
    if (key)
      this.partialCache[key] = submitted
    return submitted
  }
}

export interface Article {
  title     : string
  thumbnail : string
  url       : string
  isOld     : boolean
  update    : string
  date      : string
  categories: Category[]
  content   : string
}

export interface Category {
  name: string
  url: string
}

export interface PartialValidator {
  (
    article   : Article,
    submit    : (article: Article) => number,
    exit      : () => boolean,
    index     : number,
    articles  : Article[],
    submitted : Article[],
  ): void
}
