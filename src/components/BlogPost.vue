<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div>
        <h2 v-if="props.post.welcomeScreen">{{ props.post.title }}</h2>
        <h2 v-else>{{ props.post.title }}</h2>
        <p v-if="props.post.welcomeScreen">{{ props.post.blogPost }}</p>
        <p class="content-preview" v-else>{{ props.post.blogHTML }}</p>
        <router-link
          class="link link-light"
          v-if="props.post.welcomeScreen"
          to="#"
        >
          Login/Register<Arrow class="arrow arrow-light" />
        </router-link>
        <router-link class="link link-light" v-else to="#">
          View the post<Arrow class="arrow" />
        </router-link>
      </div>
      <div class="blog-photo">
        <img
          v-if="props.post.welcomeScreen"
          :src="getImgUrl(props.post.photo, 'jpg')"
          alt=""
        />
        <img :src="getImgUrl(props.post.blogCoverPhoto, 'jpg')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "blogPost",
  components: { Arrow },

  props: ["post"],

  setup(props) {
    const getImgUrl = (pic, ext) => {
      return `../assets/${pic}.${ext}`;
    };
    return { props, getImgUrl };
  },
};
</script>

<style lang="scss" scoped></style>
