<script>
import AppProgressBar from './AppProgressBar.vue';

export default {
  name: 'AppBook',
  components: { AppProgressBar },
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pagesCount: {
      type: Number,
      required: true,
    },
    created: {
      type: Number,
      required: true,
    },
    updated: {
      type: Number,
      required: true,
    },
    calendar: {
      type: Array,
      required: true,
    },
  },
  emits: {
    click: null,
  },
  computed: {
    read() {
      if (!this.calendar.length) return 0;
      return this.calendar.reduce((acc, [, pages]) => (acc += pages), 0);
    },
  },
  methods: {
    dateFormat(unix) {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const date = new Date(unix);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const hour = date.getHours();
      const minutes = date.getMinutes();
      return `${day} ${month}, ${hour}:${minutes}`;
    },
  },
};
</script>
<template>
  <div
    @click="$emit('click')"
    class="bg-white p-4 rounded-2xl flex flex-col gap-4 cursor-pointer transition-transform hover:-translate-y-2"
  >
    <div class="flex flex-col">
      <span class="uppercase text-xs leading-none">Book title</span>
      <p class="text-lg">{{ title }}</p>
    </div>
    <div class="flex gap-4">
      <div class="flex flex-col flex-1">
        <span class="uppercase text-xs leading-none">Author</span>
        <p class="text-lg">{{ author }}</p>
      </div>
      <div class="flex flex-col flex-1">
        <span class="uppercase text-xs leading-none">Pages count</span>
        <p class="text-lg">{{ pagesCount }}</p>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="flex flex-col flex-1">
        <span class="uppercase text-xs leading-none">Created date</span>
        <p class="text-lg">{{ dateFormat(created) }}</p>
      </div>
      <div class="flex flex-col flex-1">
        <span class="uppercase text-xs leading-none">Last update</span>
        <p class="text-lg">{{ dateFormat(updated) }}</p>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="uppercase text-xs leading-none mb-2">Progress</span>
      <app-progress-bar :currentValue="read" :maxValue="pagesCount" />
    </div>
  </div>
</template>
