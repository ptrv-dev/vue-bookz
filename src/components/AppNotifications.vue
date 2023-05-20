<script>
export default {
  name: 'AppNotifications',
  computed: {
    notifications() {
      return this.$store.state.notifications;
    },
  },
};
</script>

<template>
  <div class="fixed z-50 right-2 bottom-2 max-w-xs w-full flex flex-col gap-2">
    <transition-group name="fade">
      <div
        v-for="notification in notifications"
        :key="notification.added"
        class="text-dark bg-white rounded-lg p-4 text-sm transition-all"
      >
        <h4 class="text-base font-bold" v-if="notification.title">
          {{ notification.title }}
        </h4>
        {{ notification.text }}
      </div>
    </transition-group>
  </div>
</template>

<style>
.fade-enter-active {
  animation: slideIn 0.5s;
}
.fade-leave-active {
  animation: slideOut 0.5s;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 0;
    transform: translateX(50%);
  }
}
</style>
