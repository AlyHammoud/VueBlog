<template>
  <div class="post-view" v-if="state.currentBlog">
    <div class="container quillWrapper">
      <h2>{{ state.currentBlog[0].blogTitle }}</h2>

      <h4>
        Posted on:
        {{
          new Date(state.currentBlog[0].blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img :src="state.currentBlog[0].blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="state.currentBlog[0].blogHtml"
      ></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ViewBlog",

  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      currentBlog: null,
    });

    onBeforeMount(() => {
      state.currentBlog = store.state.blogPosts.filter(
        (post) => post.blogID == route.params.blogid
      );
    });
    return { state };
  },
};
</script>

<style lang="scss">
.post-view {
  display: flex;
  justify-content: center;
  width: 100%;

  .container {
    width: 50%;

    > img {
      width: 100%;
      height: 350px;
      object-fit: cover;
    }
  }
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
