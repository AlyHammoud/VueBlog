import { createStore } from "vuex";
import { auth, db } from "../firebase/firebaseInit";
import { getDoc, collection, doc } from "firebase/firestore";
import { setTimeout } from "core-js";

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
  },

  /*Actions*/
  actions: {
    async getCurrentUser({ state, commit }) {
      const docRef = doc(collection(db, "users"), auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      commit("setProfileInfo", docSnap);
      commit("setProfileInitials");
    },
  },
});

export default store;
