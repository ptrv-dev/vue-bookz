<script>
import AppHeader from './components/AppHeader.vue';
import AppNotifications from './components/AppNotifications.vue';
import getDates from './utils/getDates';

export default {
  name: 'App',
  components: { AppHeader, AppNotifications },
  data() {
    return {
      interval: null,
    };
  },
  computed: {
    books() {
      return this.$store.state.books;
    },
  },
  mounted() {
    const LS = window.localStorage.getItem('books');
    if (LS) {
      const books = JSON.parse(LS).map((book) => {
        if (book.calendar.length < 1) return book;

        const [date, month, year] = book.calendar[book.calendar.length - 1][0]
          .split('.')
          .map((v) => Number(v));
        const currentDate = new Date();
        if (
          date === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        )
          return book;

        const to = Date.UTC(year, month - 1, date);

        const dates = getDates(Date.now(), to)
          .reverse()
          .map((t) => [t, 0]);

        book.calendar = [...book.calendar, ...dates];
        return book;
      });

      this.$store.state.books = books;
    }
    this.interval = setInterval(
      () => this.$store.dispatch('checkNotifications'),
      1000
    );
  },
  watch: {
    books: {
      handler() {
        const LS = window.localStorage.getItem('books');
        const json = JSON.stringify(this.books);
        if (!LS || json !== LS) {
          window.localStorage.setItem('books', json);
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <app-header />
  <router-view />
  <app-notifications />
</template>
