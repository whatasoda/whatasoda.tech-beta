import route from '!data/util/route'

export default async () => ({
  ...(await route(import('!data/pug/_common'))())
})
