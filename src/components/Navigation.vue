<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="state.mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }"
            >Create Post</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Login/register</router-link
          >
        </ul>

        <!-- profile Menu -->
        <div
          v-if="user"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="state.profileMenu" class="profile-menu">
            <div class="info">
              <div class="initials">
                {{ this.$store.state.profileInitials }}
              </div>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUserName }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>

            <div class="options">
              <router-link class="option" :to="{ name: 'Profile' }">
                <userIcon class="icon" />
                <p>Profile</p>
              </router-link>

              <router-link class="option" :to="{ name: 'Admin' }">
                <adminIcon class="icon" />
                <p>Admin</p>
              </router-link>

              <div @click="signOutMe" class="option">
                <signOutIcon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <MenuIcon
      @click="toggleMobileNav"
      class="menu-icon"
      v-show="!state.mobile"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="state.mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
        <router-link class="link" :to="{ name: 'Login' }" v-if="!user"
          >Login/register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import MenuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";

import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth, db } from "../firebase/firebaseInit";

export default {
  //   name: navigation,

  components: {
    MenuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },

  setup() {
    const store = useStore();

    const profile = ref(null);

    const state = reactive({
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
      //profileInitials: null
    });

    // onAuthStateChanged(auth, (user) => {
    //     store.commit("updateUser", user);

    //     if(user){ //user.uid  or auth.currentUser.uid
    //       store.dispatch("getCurrentUser").then(() => {
    //           state.profileInitials = store.state.profileInitials;
    //       });
    //     }
    //   });

    const user = computed(() => {
      return store.state.user;
    });

    onMounted(() => {
      window.addEventListener("resize", checkScreen);
      checkScreen();
    });

    const checkScreen = () => {
      state.windowWidth = window.innerWidth;
      if (state.windowWidth >= 750) {
        state.mobile = true;
        return;
      }
      state.mobile = false;
      state.mobileNav = false;
    };

    const toggleMobileNav = () => (state.mobileNav = !state.mobileNav);

    const toggleProfileMenu = (e) => {
      if (e.target === profile.value) {
        state.profileMenu = !state.profileMenu;
      }
    };

    const signOutMe = () => {
      signOut(auth).then(() => {
        window.location.reload();
      });
    };

    return {
      state,
      toggleMobileNav,
      toggleProfileMenu,
      signOutMe,
      user,
      profile,
    };
  },
};
</script>

<style scoped lang="scss">
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        > span {
          pointer-events: none;
        }
        @media(max-width: 750px) {
            margin-right: 40px;
          }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              &:hover {
                color: rgb(119, 100, 100);
                transition: all 1s ease;
              }

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter-from {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0px);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
