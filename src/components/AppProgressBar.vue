<script>
export default {
  name: 'ProgressBar',
  props: {
    currentValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  emits: {},
  computed: {
    percent() {
      return (this.currentValue / this.maxValue) * 100;
    },
    displayPercent() {
      return Math.trunc(this.percent);
    },
  },
};
</script>

<template>
  <div class="rounded-lg flex bg-light h-4 w-full items-center relative">
    <div
      class="bg-primary h-4 rounded-lg flex text-xs text-white font-medium items-center justify-center"
      :style="{ width: this.percent + '%' }"
    >
      <template v-if="percent >= 25"> {{ displayPercent + '%' }}</template>
    </div>
    <span
      v-if="percent < 25"
      class="text-xs text-primary font-medium absolute w-full text-center"
      >{{ displayPercent + '%' }}</span
    >
  </div>
</template>
