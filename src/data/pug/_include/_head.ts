export default async (...titles: string[]) => ({
  title: [
    'whatasoda.tech',
    ...(titles.filter(title => !!title ))
  ].join(' - ')
})
