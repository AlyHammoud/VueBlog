import { createApp } from "vue";
import App from './App.vue';
import store from './store/index';
import router from './router/index';
import Vue2Editor from "vue2-editor";

const app = createApp(App);

app.use(Vue2Editor);
app.use(store);
app.use(router);
app.mount('#app');