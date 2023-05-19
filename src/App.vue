<script>
import AppHeader from './components/AppHeader.vue';
export default {
  name: 'App',
  components: { AppHeader },
  computed: {
    books() {
      return this.$store.state.books;
    },
  },
  mounted() {
    const LS = window.localStorage.getItem('books');
    if (LS) this.$store.state.books = JSON.parse(LS);
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
</template>
