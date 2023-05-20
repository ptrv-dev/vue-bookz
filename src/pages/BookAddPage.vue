<script>
export default {
  name: 'BookAddPage',
  data() {
    return {
      title: '',
      author: '',
      pages: '',
    };
  },
  mounted() {},
  methods: {
    handleBack() {
      this.$router.push('/');
    },
    handleSubmit() {
      if (!this.title || this.title.length < 3)
        return this.$store.dispatch('addNotification', {
          title: 'Error!',
          text: 'Incorrect book title',
          type: 'error',
        });

      if (!this.pages)
        return this.$store.dispatch('addNotification', {
          title: 'Error!',
          text: 'Incorrect pages count',
          type: 'error',
        });
      this.$store.dispatch('addBook', {
        title: this.title,
        author: this.author,
        pages: this.pages,
      });
      this.title = this.pages = this.author = '';
      this.$store.dispatch('addNotification', {
        title: 'Success',
        text: 'Book was added to your list',
        type: 'success',
      });
      this.$router.push('/');
    },
  },
  watch: {
    pages() {
      const regexp = new RegExp(/^[^1-9][0-9]*/);
      this.pages = this.pages.replace(regexp, '');
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="flex gap-4 items-center mb-4">
      <button
        @click="handleBack"
        class="text-white transition-colors hover:bg-white hover:text-primary p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </button>
      <h1 class="text-white font-bold text-2xl">Add a new book:</h1>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="p-8 rounded-2xl bg-white flex flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        <label for="title">Book title:</label>
        <input
          v-model="title"
          type="text"
          placeholder="A Tale of Two Cities"
          id="title"
          class="rounded-lg py-2 px-4 bg-light text-dark outline-none ring-primary focus:ring-2"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="author">Author:</label>
        <input
          v-model="author"
          type="text"
          placeholder="Charles Dickens"
          id="author"
          class="rounded-lg py-2 px-4 bg-light text-dark outline-none ring-primary focus:ring-2"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="pages">Pages count:</label>
        <input
          v-model="pages"
          type="text"
          placeholder="304"
          id="pages"
          class="rounded-lg py-2 px-4 bg-light text-dark outline-none ring-primary focus:ring-2"
        />
      </div>
      <button type="submit" class="bg-primary text-white py-2 px-4 rounded-lg">
        Add book
      </button>
    </form>
  </div>
</template>
