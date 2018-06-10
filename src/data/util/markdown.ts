import highlightjs  = require('highlight.js')
import marked       = require('marked')
import jsdom        = require('jsdom')
import HTMLEntities = require('html-entities')

const { JSDOM }     = jsdom
const { Renderer }  = marked

const entities = new HTMLEntities.AllHtmlEntities()
const renderer = new Renderer()
renderer.code = (code, lang) => {
  const validLang   = !!(lang && highlightjs.getLanguage(lang))
  const highlighted = validLang ? highlightjs.highlight(lang, code).value : entities.encode(code)
  const counter     = lineCounter(highlighted)
  return `<pre class="has-code"><code class="hljs ${lang}">${highlighted}</code>${counter}</pre>`
}
marked.setOptions({ renderer })


export default async (markdown: string) => {
  const html = await new Promise<string>((resolve, reject) =>
    marked(markdown, (err, html) => err ? reject(err) : resolve(html))
  )

  const { document } = new JSDOM(html).window


  return document.body.innerHTML
}
const EXTRACT_LANGAGE = /(?:\s|^)language-(.*?)(?=\s|$)/
const parseLangage = (className: string) => {
  const match = className.match(EXTRACT_LANGAGE)
  if (!match) return;
  return match[1]
}


const lineCounter = (content: string) =>
  `<span class="line-counter">${
    '<span class="line-number"></span>\n'.repeat((content.match(/\n/g) || []).length + 1)
  }</span>`
