import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router/index";
import Vue2Editor from "vue2-editor";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseInit";


let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
});

// const app = createApp(App);

// //app.use(Vue2Editor);
// app.use(store);
// app.use(router);
// app.mount('#app');
