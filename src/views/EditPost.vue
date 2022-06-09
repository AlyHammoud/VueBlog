<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="state.loading" />
    <div class="container">
      <div class="err-message" :class="{ invisible: !state.error }">
        <p><span>Error:</span>{{ state.errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
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
        <RichText
          :options="state.editorSettings"
          v-model:content="blogHtml"
          contentType="html"
          id="editor"
        />
      </div>
      <div class="blog-actions">
        <button @click.prevent="updateBlog">Save Changes</button>
        <router-link :to="{ name: 'BlogPreview' }" class="router-button"
          >Preview Changes</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../firebase/firebaseInit";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

import { reactive, ref } from "@vue/reactivity";
import RichText from "../components/RichText.vue";
import Loading from "../components/Loading.vue";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import { computed, onBeforeMount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import { Quill, QuillEditor } from "@vueup/vue-quill";
import { useRoute, useRouter } from "vue-router";
Quill.import("blots/block/embed");

export default {
  name: "EditBlog",
  components: { RichText, BlogCoverPreview, Loading },

  setup() {
    const blogPhoto = ref(null);
    const richTextQ = ref(null);

    const state = reactive({
      routeID: null,
      currentBlog: null,
      loading: null,
      file: null,
      downloadURL: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        ImageResize: {
          toolbarStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
            // other camelCase styles for size display
          },
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
          },
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
        imageDrop: true,
        theme: "snow",
        debug: false,
        placeholder: "Type your post...",
        //readOnly: true,
        modules: {
          imageUploader: {
            upload: (file) => {
              return new Promise((res, rej) => {
                const docRef = storageRef(
                  storage,
                  "documents/" + Math.floor(Math.random() * 10000) + file.name
                );
                // console.log("uploading...");

                uploadBytes(docRef, file)
                  .then((snapshot) => {
                    getDownloadURL(docRef).then((url) => {
                      // var quill = new Quill("#editor");
                      //quill.insertEmbed(quill.getBounds(0),"image", downloadURL);
                      state.downloadURL = url;
                    });

                    //console.log("Uploaded a blob or file!  " + snapshot);
                  })
                  .catch((err) => console.log(err));

                setTimeout(() => {
                  res(state.downloadURL);
                }, 3500);
              });
            },
          },
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

    const router = useRouter();
    const route = useRoute();

    // onBeforeMount(async () => {
    //   state.routeID = route.params.blogid;
    //   state.currentBlog = await store.state.blogPosts.filter((post) => {
    //     return post.blogID === state.routeID;
    //   });
    //   store.commit("setBlogState", state.currentBlog[0]);
    // });
    
    const profileId = computed(() => {
      return store.state.profileId;
    });

    const blogCoverPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });

    const blogTitle = computed({
      get() {
        return store.state.blogTitle;
      },
      set(payload) {
        store.commit("updateBlogTitle", payload);
      },
    });

    const blogHtml = computed({
      get() {
        return store.state.blogHtml;
      },
      set(payload) {
        store.commit("newBlogPost", payload);
      },
    });

    const fileChange = () => {
      state.file = blogPhoto.value.files[0]; //blogPhoto is ref (to get element)
      const fileName = state.file.name;
      store.commit("fileNameChange", fileName);
      store.commit("createFileURL", URL.createObjectURL(state.file));
    };

    const openPreview = () => {
      store.commit("openPhotoPreview");
    };

    const updateBlog = async () => {
      const dataBase = doc(collection(db, "blogPosts"), route.params.blogid);
      
      if (blogTitle.value.length !== 0 && blogHtml.value.length !== 0) {
        if (state.file) {
          //upload phoots
          state.loading = true;
          const fileName =
            Math.floor(Math.random() * 10000) + store.state.blogCoverPhotoName;
          const docRef = storageRef(
            storage,
            `documents/BlogCoverPhotos/${fileName}`
          );

          uploadBytes(docRef, state.file)
            .then((snapshot) => {
              getDownloadURL(docRef).then((url) => {

                updateDoc(dataBase, {
                  blogHtml: blogHtml.value,
                  blogCoverPhoto: url,
                  blogCoverPhotoName: fileName,
                  blogTitle: blogTitle.value,

                }).then(async () => {
                  await store.dispatch("updatePost", route.params.blogid);
                  state.loading = false;

                  
                });
              });
            })
            .catch((err) => {
              state.loading = false;
            }); //console.log(err));


        }
        state.loading = true;
        updateDoc(dataBase,{
          blogHtml: blogHtml.value,
          blogTitle: blogTitle.value,
        });

        await store.dispatch('updatePost', route.params.blogid);
        state.loading = false;
        router.push({name: "ViewBlog", params: {logind: dataBase.id } })
        return;
      }

      //handle erro
      state.error = true;
      state.errorMsg = " Please fill in the required data!";
      setTimeout(() => {
        state.error = false;
      }, 5000);
    };

    return {
      blogPhoto,
      state,
      profileId,
      blogCoverPhotoName,
      blogTitle,
      blogHtml,
      fileChange,
      openPreview,
      richTextQ,
      updateBlog,
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
