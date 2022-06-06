<template>
  <div class="blog-wrapper" :class="{'no-user': !user}">
    <div class="blog-content">
      <div>
        <h2 v-if="props.post.welcomeScreen">{{ props.post.title }}</h2>
        <h2 v-else>{{ props.post.title }}</h2>

        <p v-if="props.post.welcomeScreen">{{ props.post.blogPost }}</p>
        <p class="content-preview" v-else>{{ props.post.blogHTML }}</p>

        <router-link
          class="link link-light"
          v-if="props.post.welcomeScreen"
          :to="{ name: 'Login' }"
        >
          Login/Register<Arrow class="arrow link-light" />
        </router-link>

        <router-link class="link" v-else :to="{ name: 'Blogs' }">
          View the post<Arrow class="arrow" />
        </router-link>
      </div>
    </div>

    <div class="blog-photo">
      <img
        v-if="state.welcomeScreenPhoto"
        :src="getImgUrl(state.welcomeScreenPhoto, 'jpg')"
        alt=""
      />

      <img v-else :src="getImgUrl(state.blogCoverPhoto, 'jpg')" alt="" />
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import Arrow from "../assets/Icons/arrow-right-light.svg";
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
export default {
  name: "blogPost",
  components: { Arrow },

  props: ["post"],

  setup(props) {
    const state = reactive({
      welcomeScreenPhoto: props.post.photo,
      blogCoverPhoto: props.post.blogCoverPhoto,
    });

    const store = useStore();

    const user = computed(() => {
      return store.state.user;
    });

    const getImgUrl = (pic, ext) => {
      return `src/assets/blogPhotos/${pic}.${ext}`;
    };
    return { props, state, getImgUrl, user };
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;

        @media (min-width: 700px) {
          font-size: 40px;
        }

        p {
          font-size: 35px;
          font-weight: 300;
          line-height: 1, 7;
        }

        .content-preview {
          font-size: 13px;
          max-height: 24px;
          width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s all ease-in;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
  &:first-child  .arrow {
    color: white;
  }
}
</style>
