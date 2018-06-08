import { highlight } from 'highlight.js'
import marked   = require('marked')
import cheerio  = require('cheerio')
import HTMLEntities = require('html-entities')

const entities = new HTMLEntities.AllHtmlEntities()
const completelyEncode = (toEncode: string) =>
  entities.encode(entities.encode(toEncode))

export default async (markdown: string) => {
  const html = await new Promise<string>((resolve, reject) =>
    marked(markdown, (err, html) => err ? reject(err) : resolve(html))
  )

  const $ = cheerio.load(html, {
    normalizeWhitespace: true,
    decodeEntities: false
  })

  const hljsRecursive = (node: CheerioElement): string => {
    if (!(node && node.parent)) return ''
    if (node.type === 'text') return entities.encode(node.nodeValue)
    if (node.type === 'tag') {
      const isHLJS = $(node).is('[class*=hljs]')
      if (isHLJS) {
        const conetnt = node.childNodes.map(hljsRecursive).join('')
        return $.html($(node).text(conetnt))
      }
      if (!isHLJS) {
        if (!node.childNodes.length) return entities.encode($.html(node))
        const content = node.childNodes.map(hljsRecursive).join('')
        const raw   = [...$.html(node)]
        const empty = [...$.html($(node).empty())]
        const insertAt = empty.findIndex((char, index) => char !== raw[index])
        if (insertAt === -1) return ''
        const encoded = empty.map(char => entities.encode(char || ''))
        encoded.splice(insertAt, 0, content)
        return encoded.join('')
      }
    }
    return ''
  }

  $('code').each((index, node) => {
    if (!(node && node.parent)) return;
    const $node   = $(node)
    const $parent = $node.parent()
    if (!$parent.is('pre')) return $node.text(entities.encode($node.html() || ''))

    $parent.addClass('has-code')

    const lang      = parseLangage($node.attr('class') || '')
    const codeText  = $node.html()
    if (!codeText) return;
    if (!lang) return $node.text(applyLineCounter(entities.encode(codeText)))
    try {
      const highlighted = highlight(lang, codeText)
      $node.html(highlighted.value)
      const content = node.children.map(hljsRecursive).join('')
      $node.text(applyLineCounter(content))
    } catch (e) {
      console.log(e)
      return;
    }
  })

  return $('body').html() || ''
}
const EXTRACT_LANGAGE = /(?:\s|^)language-(.*?)(?=\s|$)/
const parseLangage = (className: string) => {
  const match = className.match(EXTRACT_LANGAGE)
  if (!match) return;
  return match[1]
}


const applyLineCounter = (content: string) =>
  content + `<span class="line-counter">${
    '<span class="line-number"></span>\n'.repeat((content.match(/\n/g) || []).length + 1)
  }</span>`
