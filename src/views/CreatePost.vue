<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
    <div class="container">
      <div class="err-message" :class="{ invisible: !state.error }">
        <p><span>Error:</span>{{ state.errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input
          type="text"
          placeholder="Enter Blog Title"
          v-model="blogTitle"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
            @change="fileChange"
          />
          <button
            class="preview"
            @click="openPreview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <rich-text :options="state.editorSettings" v-model:content="blogHtml" contentType="html"/>
      </div>
      <div class="blog-actions">
        <button>Publish Blog</button>
        <router-link to="#" class="router-button">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import RichText from "../components/RichText.vue";
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "CreatePost",
  components: { RichText, BlogCoverPreview },

  setup() {

    const blogPhoto = ref(null);

    const state = reactive({
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        imageResize: {
          displaySize: true, // default false
        },
        theme: "snow",
        debug: false,
        placeholder: "Type your post...",
        //readOnly: true,
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote" /*, 'code-block'*/],

              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],

              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [/*1,*/ 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["image"],
              ["clean"],
            ],
            //handlers: { image: showImageUI },
          },
        },
      },
    });

    const store = useStore();

    const profileId = computed(() => {
      return store.state.profileId;
    });

    const blogCoverPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });

    const blogTitle = computed({
      get(){
        return store.state.blogTitle;
      },
      set(payload){
        store.commit("updateBlogTitle", payload)
      }
    });
    const blogHtml = computed({
      get(){
        return store.state.blogHtml;
      },
      set(payload){
        store.commit("newBlogPost", payload)
      }
    });

    const fileChange = () => {
      state.file = blogPhoto.value.files[0]; //blogPhoto is ref (to get element)
      const fileName = state.file.name;
      store.commit("fileNameChange", fileName);
      store.commit("createFileURL", URL.createObjectURL(state.file))
    };

    const openPreview = () => {
      store.commit("openPhotoPreview");
    }

    return{ blogPhoto ,state, profileId, 
            blogCoverPhotoName,  blogTitle, blogHtml,
            fileChange, openPreview
          };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>
