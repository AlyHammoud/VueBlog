import { createStore } from "vuex";
import { auth, db } from "../firebase/firebaseInit";
import { getDoc, collection, doc, updateDoc } from "firebase/firestore";

const store = createStore({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2022",
      },
    ],

    blogHtml: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
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

  /*Mutations*/
  mutations: {
    newBlogPost(state, payload) {
      state.blogHtml = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
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
  },
});

export default store;
