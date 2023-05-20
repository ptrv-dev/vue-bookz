<script>
import AppEditable from '../components/AppEditable.vue';
import formatDate from '../utils/formatDate.js';

export default {
  name: 'BookPage',
  components: { AppEditable },
  data() {
    return {
      pagesCount: '',
      editable: null,
    };
  },
  computed: {
    paramId() {
      return Number(this.$route.params.id);
    },
    book() {
      return this.$store.state.books.find((b) => b._id === this.paramId);
    },
    read() {
      if (!this.book.calendar.length) return 0;
      return this.book.calendar.reduce((acc, [, pages]) => (acc += pages), 0);
    },
    pagesPerDay() {
      return Math.trunc(this.read / this.book.calendar.length);
    },
    daysLeft() {
      return Math.trunc(this.book.pages / this.pagesPerDay);
    },
    progress() {
      return Math.trunc((this.read / this.book.pages) * 100);
    },
  },
  methods: {
    formatDate,
    handleBack() {
      this.$router.push('/');
    },
    handleAddMark() {
      if (!this.pagesCount) return;
      this.$store.dispatch('addMark', {
        _id: this.book._id,
        pages: Number(this.pagesCount),
      });
      this.$store.dispatch('addNotification', {
        title: 'Success',
        text: 'Mark was added',
        type: 'success',
      });
      this.pagesCount = '';
    },
    handleDelete() {
      if (
        !window.confirm(
          'Do you really want to delete this book from your list?'
        )
      )
        return;
      this.$store.dispatch('removeBook', { _id: this.paramId });
      this.$store.dispatch('addNotification', {
        title: 'Success',
        text: 'Book was successfully deleted',
        type: 'success',
      });
      this.$router.push('/');
    },
    handleEditSave(newValue) {
      if (this.editable === 'title') {
        this.$store.dispatch('editBook', {
          _id: this.paramId,
          title: newValue,
        });
      } else if (this.editable === 'author') {
        this.$store.dispatch('editBook', {
          _id: this.paramId,
          author: newValue,
        });
      }

      this.editable = null;
      this.$store.dispatch('addNotification', {
        text: 'Saved',
        type: 'success',
      });
    },
    handleEditCancel() {
      this.editable.target = this.editable.value = null;
    },
  },
  watch: {
    pagesCount() {
      const regexp = new RegExp(/^[^1-9][0-9]*/);
      this.pagesCount = this.pagesCount.replace(regexp, '');
    },
  },
};
</script>

<template>
  <div class="container flex flex-col gap-8">
    <div>
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
        <h1 class="text-white font-bold text-2xl flex-1">
          Detailed information:
        </h1>
        <button
          @click="handleDelete"
          class="bg-white p-2 rounded-full text-primary transition-colors hover:text-red-600"
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col bg-white text-dark p-8 rounded-2xl gap-4">
        <div class="inline-flex items-start flex-col">
          <span
            class="uppercase text-xs leading-none inline-flex items-center gap-1"
            >Book title
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
              />
              <path
                d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
              />
            </svg>
          </span>
          <p
            v-if="editable !== 'title'"
            @click="editable = 'title'"
            class="text-lg cursor-cell"
          >
            {{ book.title }}
          </p>
          <app-editable
            v-else
            :initial-value="book.title"
            @save="handleEditSave"
            @cancel="editable = null"
          />
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div class="inline-flex items-start flex-col">
            <span
              class="uppercase text-xs leading-none inline-flex items-center gap-1"
              >Author<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                /></svg
            ></span>
            <p
              v-if="editable !== 'author'"
              @click="editable = 'author'"
              class="text-lg cursor-cell"
            >
              {{ book.author }}
            </p>
            <app-editable
              v-else
              :initial-value="book.author"
              @save="handleEditSave"
              @cancel="editable = null"
            />
          </div>
          <div class="inline-flex items-start flex-col">
            <span
              class="uppercase text-xs leading-none inline-flex items-center gap-1"
              >Publication year<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                /></svg
            ></span>
            <p
              v-if="editable !== 'publication'"
              @click="editable = 'publication'"
              class="text-lg cursor-cell"
            >
              -
            </p>
            <app-editable
              v-else
              initial-value="-"
              @save="handleEditSave"
              @cancel="editable = null"
            />
          </div>
          <div class="inline-flex items-start flex-col">
            <span
              class="uppercase text-xs leading-none inline-flex items-center gap-1"
              >Pages count<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                /></svg
            ></span>
            <p
              v-if="editable !== 'pages'"
              @click="editable = 'pages'"
              class="text-lg cursor-cell"
            >
              {{ book.pages }}
            </p>
            <app-editable
              v-else
              :initial-value="book.pages"
              @save="handleEditSave"
              @cancel="editable = null"
            />
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Addition date</span>
            <p class="text-lg">{{ formatDate(book.created) }}</p>
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Last update</span>
            <p class="text-lg">{{ formatDate(book.updated) }}</p>
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Progress</span>
            <p class="text-lg">{{ progress }}%</p>
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Pages read</span>
            <p class="text-lg">{{ read }}</p>
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Pages per day</span>
            <p class="text-lg">~ {{ pagesPerDay }}</p>
          </div>
          <div class="inline-flex items-start flex-col">
            <span class="uppercase text-xs leading-none">Days left</span>
            <p class="text-lg">~ {{ daysLeft }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-white font-bold text-2xl mb-4">Mark the read:</h1>
      <div class="bg-white text-dark rounded-2xl p-8 flex gap-4">
        <input
          v-model="pagesCount"
          @keydown.enter="handleAddMark"
          class="rounded-lg bg-light text-dark px-4 py-2 flex-1 outline-none ring-primary focus:ring-2 min-w-0"
          type="text"
          placeholder="Pages count"
        />
        <button
          @click="handleAddMark"
          class="text-white bg-primary rounded-lg px-4 py-2 inline-flex items-center gap-2"
        >
          <svg
            width="12"
            height="17"
            viewBox="0 0 12 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_221)">
              <path
                d="M0 2C0 1.17188 0.671875 0.5 1.5 0.5V2V14.2937L5.56563 11.3906C5.825 11.2031 6.17812 11.2031 6.4375 11.3906L10.5 14.2937V2H1.5V0.5H10.5C11.3281 0.5 12 1.17188 12 2V15.75C12 16.0312 11.8438 16.2875 11.5938 16.4156C11.3438 16.5437 11.0438 16.5219 10.8156 16.3594L6 12.9219L1.18438 16.3594C0.95625 16.5219 0.65625 16.5437 0.40625 16.4156C0.15625 16.2875 0 16.0312 0 15.75V2Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_221">
                <rect
                  width="12"
                  height="16"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Add mark
        </button>
      </div>
    </div>
    <div v-if="book.calendar.length">
      <h1 class="text-white font-bold text-2xl mb-4">Calendar:</h1>
      <div class="bg-white text-dark p-8 rounded-2xl">
        <table class="table-auto w-full">
          <thead class="bg-light">
            <th class="font-normal">#</th>
            <th class="font-normal">Date</th>
            <th class="font-normal">Pages</th>
            <th class="font-normal">Progress</th>
          </thead>
          <tbody class="[&>tr:nth-child(even)]:bg-light">
            <tr
              v-for="([date, pages], idx) in book.calendar"
              class="text-center"
            >
              <td>{{ idx + 1 }}</td>
              <td>{{ date }}</td>
              <td>{{ pages }}</td>
              <td>+{{ Number((pages / book.pages) * 100).toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
