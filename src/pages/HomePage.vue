<script>
import AppBook from '../components/AppBook.vue';

export default {
  name: 'HomePage',
  components: { AppBook },
  computed: {
    books() {
      return this.$store.state.books;
    },
  },
  methods: {
    handleBookClick(_id) {
      this.$router.push('/book/' + _id);
    },
  },
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-white text-2xl font-bold">
      {{ books.length ? 'List of your books:' : 'Your books list is empty...' }}
    </h1>
    <div v-if="books.length" class="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
      <app-book
        v-for="book in books"
        @click="handleBookClick(book._id)"
        :title="book.title"
        :author="book.author"
        :pagesCount="Number(book.pages)"
        :created="book.created"
        :updated="book.updated"
        :calendar="book.calendar"
      />
    </div>
  </div>
</template>
