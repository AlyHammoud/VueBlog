import { createStore } from "vuex";
import { auth, db } from "../firebase/firebaseInit";
import {
  getDoc,
  collection,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const store = createStore({
  state: {
    
    blogPosts: [],
    postLoaded: null,

    blogHtml: "Write your blog title here...",
    blogTitle: "",
    blogCoverPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,

    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },

  getters:{
    blogPostsFeed(state){
      return state.blogPosts.slice(0, 2);
    },

    blogPostsCard(state){
      return state.blogPosts.slice(2, 6);
    }
  },

  /*Mutations*/
  mutations: {
    newBlogPost(state, payload) {
      state.blogHtml = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogCoverPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    setBlogState(state, payload){
      state.blogTitle = payload.blogTitle;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogCoverPhotoName = payload.blogCoverPhotoName;
      
      state.blogHtml = payload.blogHtml;
    },

    filterBlogPost(state, payload){
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload)
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    //fired in actions
    async setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    },

    async setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },

    //change firstName
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    //change lastName
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    //change userName
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
  },

  /*Actions*/
  actions: {
    async getCurrentUser({ state, commit }) {
      const docRef = doc(collection(db, "users"), auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      commit("setProfileInfo", docSnap);
      commit("setProfileInitials");
    },

    async updateUserSettings({ commit, state }) {
      const docRef = doc(collection(db, "users"), state.profileId);

      await updateDoc(docRef, {
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        usertName: state.profileUserName,
      });

      commit("setProfileInitials");
    },

    async updatePost({commit, dispatch}, payload){
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    async getPost({ state }) {
      const docRef = collection(db, "blogPosts");
      //const docSnap = await getDoc(docRef);

      const docSnap =  query(docRef, orderBy("date", "desc"));

      const querySnapshot = await getDocs(docSnap);

      querySnapshot.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogId,
            blogHtml: doc.data().blogHtml,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };

          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },

    async deletePost({commit}, payload){

      await deleteDoc(doc(db, "blogPosts", payload));

      commit('filterBlogPost', payload)
    }
  },
});

export default store;
