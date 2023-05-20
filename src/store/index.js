import { createStore } from 'vuex';

export const store = createStore({
  state: {
    books: [],
    notifications: [],
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
        calendar: [],
      };
      ctx.state.books.push(book);
    },
    removeBook(ctx, { _id }) {
      const book = ctx.state.books.find((b) => b._id === _id);
      if (!book) throw new Error("Specified id doesn't found!");

      ctx.state.books = ctx.state.books.filter((b) => b !== book);
    },
    addMark(ctx, { _id, pages }) {
      const book = ctx.state.books.find((b) => b._id === _id);
      if (!book) throw new Error("Specified id doesn't found!");
      book.updated = Date.now();

      const key = new Date().toLocaleDateString('ru-RU');
      const mark = book.calendar.find((t) => t[0] === key);
      if (mark) {
        mark[1] += pages;
      } else {
        book.calendar.push([key, pages]);
      }
    },
    addNotification(ctx, { title, text }) {
      ctx.state.notifications.push({
        added: Date.now(),
        title,
        text,
      });
    },
    clearNotifications(ctx) {
      ctx.state.notifications = [];
    },
    checkNotifications(ctx) {
      ctx.state.notifications = ctx.state.notifications.filter(
        (n) => n.added + 5000 > Date.now()
      );
    },
  },
});
