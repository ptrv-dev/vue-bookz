<script>
export default {
  name: 'header',
  mounted() {},
  computed: {
    isButtonVisible() {
      const invisibleRoutes = ['/book/add'];
      return !invisibleRoutes.includes(this.$route.fullPath);
    },
  },
};
</script>
<template>
  <header>
    <div class="container py-4 flex justify-between items-center">
      <router-link to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <router-link
        v-if="isButtonVisible"
        to="/book/add"
        class="inline-flex items-center gap-2 bg-white text-primary py-2 px-4 rounded-lg font-medium"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.23077 1.73077C9.23077 1.05 8.68077 0.5 8 0.5C7.31923 0.5 6.76923 1.05 6.76923 1.73077V7.26923H1.23077C0.55 7.26923 0 7.81923 0 8.5C0 9.18077 0.55 9.73077 1.23077 9.73077H6.76923V15.2692C6.76923 15.95 7.31923 16.5 8 16.5C8.68077 16.5 9.23077 15.95 9.23077 15.2692V9.73077H14.7692C15.45 9.73077 16 9.18077 16 8.5C16 7.81923 15.45 7.26923 14.7692 7.26923H9.23077V1.73077Z"
            fill="currentColor"
          />
        </svg>
        Add
      </router-link>
    </div>
  </header>
</template>
