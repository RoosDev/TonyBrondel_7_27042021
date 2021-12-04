import axios from "axios";

let myHead = { id: "", accessToken: "", roleToken: "" };
const API_User_URL = "http://localhost:3001/api/auth/";

export const usersBase = {
  // namespaced: true,

  state: {
    userDetail: [],
    usersList: [],
  },

  actions: {
    // Utilisation du Store pour changer son mot de passe
    async changePass({ commit }: { commit: any }, user) {
      if (user.accessToken == null || user.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = user.id),
          (myHead.accessToken = user.accessToken),
          (myHead.roleToken = user.roleToken);
      }
      await axios.put(
        API_User_URL + "myprofile/pass/" + user.id,
        {
          id: user.id,
          email: user.hidemail,
          password: user.password,
        },
        {
          headers: {
            "x-access-token": user.accessToken!,
            "x-role-token": user.roleToken!,
          },
        }
      )        .then((theUsers: any) => {
        commit("SETUSERDETAIL", theUsers.data.data);
      });

    },

    // Utilisation du Store pour changer son propre profil
    async changeProfile({ commit }: { commit: any }, userDetail) {
      if (userDetail.accessToken == null || userDetail.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        console.log('pouet pouet'), 
        (myHead.id = userDetail.id),
          (myHead.accessToken = userDetail.accessToken),
          (myHead.roleToken = userDetail.roleToken);
      }
      console.log('my head change profile >> ', myHead)
      await axios
        .put(
          API_User_URL + "profile/" + userDetail.id,
          {
            id: userDetail.id,
            email: userDetail.email,
            firstname: userDetail.firstname,
            lastname: userDetail.lastname,
            job: userDetail.job,
            division: userDetail.division,
          },
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
            },
          }
        )
        .then((theUser: any) => {
          console.log(theUser.data.data)
          commit("SETUSERDETAIL", theUser.data.data);
        })
        .then((theUsers: any) => {
          commit("SETUSERS", theUsers.data.data);
        });
    },

    // Utilisation du Store pour supprimer son propre profil
    async deleteProfile({ commit }: { commit: any }, userDetail) {
      if (userDetail.accessToken == null || userDetail.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = userDetail.id),
          (myHead.accessToken = userDetail.accessToken),
          (myHead.roleToken = userDetail.roleToken);
      }
      await axios
        .put(
          API_User_URL + "profile/getout/" + myHead.id,
          {
            id: myHead.id,
          },
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
            },
          }
        )
        .then((theUsers: any) => {
          commit("SETUSERS", theUsers.data);
        });
    },

    // Utilisation du Store pour changer son profil
    async deleteProfileAdmin({ commit }: { commit: any }, usertoDelete) {
      if (
        usertoDelete.accessToken == null ||
        usertoDelete.roleToken == null
      ) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = usertoDelete.id),
          (myHead.accessToken = usertoDelete.accessToken),
          (myHead.roleToken = usertoDelete.roleToken);
      }
      console.log("userDetail>>", usertoDelete);
      await axios
        .put(
          API_User_URL + "profile/getouts/" + usertoDelete.id,
          {
            id: usertoDelete.id,
          },
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
            },
          }
        )
        .then((theUsers: any) => {
          commit("SETUSERS", theUsers.data.data);
        });
    },

    // Utilisation du Store pour changer son rôle
    async changeRole({ commit }: { commit: any }, usertoChange) {
      console.log('usertoChange >> ', usertoChange)
      if (
        usertoChange.accessToken == null ||
        usertoChange.roleToken == null
      ) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = usertoChange.id),
          (myHead.accessToken = usertoChange.accessToken),
          (myHead.roleToken = usertoChange.roleToken);
      }
      console.log('myHead >> ', myHead)
      await axios
        .put(
          API_User_URL + "profile/role/" + usertoChange.idToChange,
          {
            idToChange: usertoChange.idToChange,
            role: usertoChange.role,
          },
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
            },
          }
        )
        .then((theUser: any) => {
          commit("SETUSERS", theUser.data.data);
        });
    },

    async getUser({ commit }: { commit: any }, userId) {
      if (userId.accessToken == null || userId.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = userId.id),
          (myHead.accessToken = userId.accessToken),
          (myHead.roleToken = userId.roleToken);
      }
      await axios
        .get(API_User_URL + "profile/" + userId.id, {
          headers: {
            "x-access-token": userId.accessToken,
            "x-role-token": userId.roleToken,
          },
        })
        .then((theUser: any) => {
          commit("SETUSERDETAIL", theUser.data.data);
        });
    },

    async getUsers({ commit }: { commit: any }, userId) {
      if (userId.accessToken == null || userId.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = userId.id),
          (myHead.accessToken = userId.accessToken),
          (myHead.roleToken = userId.roleToken);
      }
      await axios.get(API_User_URL + "profile/", {
        headers: {
          "x-access-token": myHead.accessToken,
          "x-role-token": myHead.roleToken,
        },
      })
        .then((theUsers: any) => {
          commit("SETUSERS", theUsers.data.data);
        });
    },

  },

  getters: {
    allUsers: (state) => state.usersList,
    currentUser: (state) => state.userDetail,
  },

  mutations: {
    // Détail du profil d'un utilisateur
    SETUSERDETAIL(state: any, userDetail: any) {
      state.userDetail = userDetail;
    },
    // List des utilisateurs
    SETUSERS(state: any, usersList: any) {
      state.usersList = usersList;
    },
  },
};
