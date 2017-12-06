const MOCK = {
  books: [
    {
      id: 1,
      title: 'Why did I kill my cat ?',
      author: 'Steven HARVEY',
    },
    {
      id: 2,
      title: 'How to resurect someone\'s cat...',
      author: 'Jordan GARNIER',
    },
  ],
  nextId: 3,
}

module.exports = {
  all (req, res) {
    Promise.resolve(MOCK.books)
      .then(r => res.json(r))
  },

  byId (req, res) {
    const book = MOCK.books.find((b) => b.id === parseInt(req.params.id, 10))
    Promise.resolve(book)
      .then(r => {
        if (r) res.json(r)
        else res.status(404).end()
      })
  },

  create (req, res) {
    const newBook = {
      id: MOCK.nextId,
      title: req.body.title,
      author: req.body.author,
    }
    MOCK.nextId += 1
    MOCK.books.push(newBook)
    Promise.resolve(newBook)
      .then(book => res
        .status(201)
        .location(`<%= apiRoot %>/examples/${book.id}`)
        .json(book))
  },
}
