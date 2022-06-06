<template>
  <div class="home">
    <BlogPost v-if="!user" :post="state.welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in state.sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
            <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Regsiter for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCards.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
  name: "Home",
  components: {BlogPost, BlogCard, Arrow },

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
          blogCoverPhoto: "designed-for-everyone"
        },
        {
          title: "this is title Two",
          blogHTML: "This is Blog html Two",
          blogCoverPhoto: "beautiful-stories"
        }
      ],
    });

    const store = useStore(); //instead of this.$store
    //this.$store.state.name
    //this.$store.commit('abc')  //

    const sampleBlogCards = computed(() => {
      return store.state.sampleBlogCards;
    });
    
    const user = computed(() => {
      return store.state.user;
    });
    
    return { state, sampleBlogCards, user };
  },
};
</script>

<style lang="scss" scoped>

.blog-card-wrap {
  h3{
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates{
    .container{
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media(min-width: 800px){
        padding: 125px 25px;
        flex-direction: row;
      }
    }

    .router-button{
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;

      }

      &:hover{
        .arrow{
          color: #fff;
        }
      }
    }

    h2{
      font-size: 32px;
      font-weight: 300;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media(min-width: 800px){
        text-align: initial;
        font-size: 40px;
      }
    }
  }
</style>