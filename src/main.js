import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

import { store } from './store';

import HomePage from './pages/HomePage.vue';
import BookAddPage from './pages/BookAddPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/book/add', component: BookAddPage },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
