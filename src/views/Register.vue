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
          <input type="text" placeholder="First Name" v-model="state.firstName" />
          <user class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="User Name" v-model="state.userName" />
          <user class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Email" v-model="state.email" />
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
      </div>

      <button class="button">Sign up</button>
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
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },

  setup() {
    const state = reactive({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      userName: null,
    });

    return { state };
  },
};
</script>


<style lang="scss" scoped>

.register{
  h2{
    max-width: 350px;
  }
}

</style>