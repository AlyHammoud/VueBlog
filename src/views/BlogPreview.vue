<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ blogTitle }}</h2>
      <img :src="blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="blogHtml"></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  name: "PostPreview",

  setup() {
    const state = reactive({});

    const store = useStore();

    const blogTitle = computed(() => {
      return store.state.blogTitle;
    });

    const blogCoverPhoto = computed(() => {
      return store.state.blogPhotoFileURL;
    });

    const blogHtml = computed(() => {
      return store.state.blogHtml;
    });

    return { blogTitle, blogCoverPhoto, blogHtml };
  },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;
  display: flex;
  //   align-items: flex-start;

  .container {
    width: 100%;
    max-width: 1000px;
    padding: 60px 25px;
    margin: 0;
    display: flex;
    flex-direction: column;

    .ql-editor {
      padding: 0;
    }

    h2 {
      margin-bottom: 16px;
      font-weight: 500;
      font-size: 32px;
    }

    img {
      width: 350px;
      border-radius: 10px;
      align-self: center;
      justify-self: center;
      margin-bottom: 32px;
      box-shadow: 1p 10px 12px black;
    }
  }
}
</style>