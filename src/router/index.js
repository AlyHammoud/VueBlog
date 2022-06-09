import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditPost.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      middleware: [],
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs",
      middleware: [],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      middleware: ["guest"],
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      middleware: ["guest"],
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      middleware: ["guest"],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      middleware: ["auth"],
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      middleware: ["auth"],
    },
  },
  {
    path: "/createPost",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      middleware: ["auth"],
    },
  },
  {
    path: "/blog-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Blog preview",
      middleware: ["auth"],
    },
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "View Blog",
      middleware: [],
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "Edit Blog",
      middleware: ['auth'],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | FireBlog`;

  if (store.state.user !== null && to.meta.middleware.includes('guest')) {
    next("/");
  }else if(store.state.user === null && to.meta.middleware.includes('auth')){
    next("/");
  }else {
    next();
  }
});

export default router;
