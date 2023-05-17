import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

import HomePage from './pages/HomePage.vue';

const routes = [{ path: '/', component: HomePage }];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.mount('#app');
