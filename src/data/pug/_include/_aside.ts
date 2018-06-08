export default async () => ({
  profile: {
    ...((en: string, ja: string) => ({
      name: { en, ja },
      avatarAlt: `${en}/${ja}`
    }))('whatasoda', 'だーはた'),
    social: [
      { type: 'mail'    , name: 'whatasoda' , icon: 'envelope-square' , url: 'mailto:a16dc107@dhw.ac.jp' },
      { type: 'twitter' , name: '@htd_SPK'  , icon: 'twitter'         , url: 'https://twitter.com/htd_SPK' },
      { type: 'github'  , name: 'whatasoda' , icon: 'github'          , url: 'https://github.com/whatasoda' },
    ],
    bio: [
      '札幌市出身',
      '都内大学３年生',
      'JavaScriptを中心にフロントエンドの勉強をしながら学内サークルでポーカーをやってます。',
      'TS, Node, React',
    ]
  },
  category: {
    title: 'Category',
    items: [
      { text: 'TypeScript', count: 10 , url: 'category/typescript'},
      { text: 'JavaScript', count: 12 , url: 'category/javascript'},
      { text: 'Node.js'   , count: 3  , url: 'category/node-js'},
      { text: 'React.js'  , count: 4  , url: 'category/react-js'},
    ]
  },
  comments: {
    title: 'Comments',
    items: [
      { text: 'aaaaaa'    , url: 'article/typescript-strongest-type-tool'},
      { text: 'eeeeeee'   , url: 'article/javascript-great-syntax'},
      { text: 'wwwwww'    , url: 'article/node-js-bug-fix'},
      { text: 'gwqgwqgwq' , url: 'article/react-js-memo'},
    ]
  },
  links: {
    title: 'Links',
    items: [
      { text: 'デジハリライフ' , url: 'https://dhu.life/'},
      { text: 'NEXT POKER'    , url: '#'},
      { text: 'aaa' , url: '#'},
    ]
  }
})
