<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>

      <h2>Create your FireBlog account!</h2>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="First Name"
            v-model="state.firstName"
          />
          <user class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Last Name" v-model="state.lastName" />
          <user class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="User Name" v-model="state.userName" />
          <user class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Email" v-model="state.email" />
          <email class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Password" v-model="state.password" />
          <password class="icon" />
        </div>

        <div v-show="state.error" class="error">{{ state.errroMsg }}</div>
      </div>

      <button @click.prevent="register" class="button">Sign up</button>
      <div class="angle"></div>
    </form>

    <div class="background"></div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import email from "../assets/icons/envelope-regular.svg";
import password from "../assets/icons/lock-alt-solid.svg";
import user from "../assets/icons/user-alt-light.svg";

import { createUserWithEmailAndPassword } from "firebase/auth";
// the relevant methods
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseInit";

import { useRoute, useRouter } from "vue-router";

export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },

  setup() {
    const state = reactive({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      error: null,
      errroMsg: null,
    });

    const router = useRouter();

    const register = async () => {
      if (
        state.email !== "" &&
        state.password !== "" &&
        state.firstName !== "" &&
        state.lastName !== "" &&
        state.userName !== ""
      ) {
        state.error = false;
        state.errroMsg = "";

        const createUser = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const dataBase = doc(collection(db, "users"), createUser.user.uid);
        await setDoc(dataBase, {
          firstName: state.firstName,
          lastName: state.lastName,
          userName: state.userName,
          email: state.email,
        });

        router.push({ name: "Home" });
        return;
      }

      state.error = true;
      state.errroMsg = "Please fill all fields";
      return;
    };

    return { state, register };
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
