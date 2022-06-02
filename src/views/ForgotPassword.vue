<template>
  <div class="reset-password">
    <Modal v-if="state.modalActive" @close-modal="closeModal" />
    <Loading v-if="state.loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it.</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="state.email" />
            <email class="icon" />
          </div>
        </div>
        <button class="button">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="backgrou"></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import email from "../assets/icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "ForgotPassword",
  components: {
    email,
    Modal,
    Loading,
  },

  setup() {
    const state = reactive({
      email: null,
      modalActive: false,
      modalMessage: "",
      loading: null
    });

    const closeModal = () => {
      state.modalActive = !state.modalActive;
      state.email = "";
    };

    return { state, closeModal };
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
