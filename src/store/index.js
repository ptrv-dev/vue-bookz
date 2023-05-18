import { createStore } from 'vuex';

export const store = createStore({
  state: {
    books: [],
  },
  actions: {
    clearBooks(ctx) {
      ctx.state.books = [];
    },
    addBook(ctx, payload) {
      const book = {
        _id: Math.trunc(Date.now() * Math.random()),
        title: payload.title,
        author: payload.author,
        pages: payload.pages,
        created: Date.now(),
        updated: Date.now(),
        read: 0,
      };
      ctx.state.books = [...ctx.state.books, book];
    },
    removeBook(ctx, { id }) {
      ctx.state.books = ctx.state.books.filter((book) => book._id !== id);
    },
  },
});
