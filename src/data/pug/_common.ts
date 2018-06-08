import route from '!data/util/route'

export default async () => ({
  domain: 'http://localhost:3000',
  header: await route(import('!data/pug/_include/_header'))(),
  aside : await route(import('!data/pug/_include/_aside'))(),
  nav   : await route(import('!data/pug/_include/_nav'))(),
  gadget: await route(import('!data/pug/_mixin/_gadget'))(),
})
