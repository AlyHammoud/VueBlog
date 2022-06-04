<template>
  <div class="reset-password">
    <Modal
      v-if="state.modalActive"
      :modalMessage="state.modalMessage"
      @close-modal="closeModal"
    />
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
        <button class="button" @click.prevent="resetPassword">Reset</button>
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Back to login</router-link
        >
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import email from "../assets/icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

import { auth, db } from "../firebase/firebaseInit";
import { sendPasswordResetEmail } from "@firebase/auth";

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
      loading: null,
    });

    const closeModal = () => {
      state.modalActive = !state.modalActive;
      state.email = "";
    };

    const resetPassword = () => {
      state.loading = true;
      sendPasswordResetEmail(auth, state.email).then(() => {
        state.modalMessage =
          "If your account exists, you will receive a reset email";
          state.loading = false;
          state.modalActive = true;
      }).catch((err) => {
        state.modalMessage = err.message;
        state.loading = false;
        state.modalActive = true;
        state.email = "";
      });
    };

    return { state, closeModal, resetPassword };
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

      .router-link {
        margin-top: 10px;
        color: #000;
        transition: all 1s ease;

        &:hover {
          color: #7e7979;
        }
      }
    }
  }
}
</style>
