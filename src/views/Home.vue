<template>
  <div class="home">
    <BlogPost :post="state.welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in state.sampleBlogPost" :key="index" />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  components: {BlogPost},

  setup() {
    const state = reactive({
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },

      sampleBlogPost: [
        {
          title: "this is title one",
          blogHTML: "This is Blog html one",
          blogCoverPhone: "designed-for-everyone"
        },
        {
          title: "this is title Two",
          blogHTML: "This is Blog html Two",
          blogCoverPhoto: "beautiful-stories"
        }
      ]
    });

    return { state };
  },
};
</script>
