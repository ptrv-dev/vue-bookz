<script>
export default {
  name: 'AppEditable',
  props: {
    initialValue: {
      type: String,
      default: '',
    },
  },
  emits: {
    save: null,
    cancel: null,
  },
  data() {
    return {
      value: '',
    };
  },
  mounted() {
    this.value = this.initialValue;
  },
};
</script>

<template>
  <div class="flex items-center gap-1 w-full">
    <input
      type="text"
      v-model="value"
      class="text-lg flex-1 bg-transparent border-b-dark border-b outline-none min-w-0"
    />
    <button
      @click="$emit('save', value)"
      class="text-dark rounded-full p-1 transition-colors hover:bg-green-500 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      @click="$emit('cancel')"
      class="text-dark rounded-full p-1 transition-colors hover:bg-red-500 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    </button>
  </div>
</template>
