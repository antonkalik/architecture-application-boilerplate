export const db = [
  {
    id: 1,
    username: 'johnwick',
    email: 'johnwick@mailtest.com',
    posts: [
      { id: 938, uuid: '4m7vf82jls5d', title: 'First Post' },
      { id: 142, uuid: 'l864bfb2lsj2', title: 'Second Post' },
      { id: 763, uuid: 'j3tf33e4fl0s', title: 'Third Post' },
    ],
  },
  {
    id: 2,
    username: 'michaelcarleone',
    email: 'michaelcarleone@mailtest.com',
    posts: [
      { id: 938, uuid: 'p2648uf7jv2h', title: 'First Post' },
      { id: 142, uuid: 'vc34fg1p537s', title: 'Second Post' },
    ],
  },
].map(item => ({
  ...item,
  posts: item.posts.map(post => ({
    ...post,
    author: item.id,
  })),
}));
