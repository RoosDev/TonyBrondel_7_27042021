import axios from "axios";

const myHead = JSON.parse(localStorage.getItem("user")!)  ;
const API_User_URL = "http://localhost:3001/api/auth/";

export const usersBase = {
  namespaced: true,

  state: {
    userDetail: [],
    usersList: [],
  },

  actions: {
    // Utilisation du Store pour changer son mot de passe
    changePass({ commit }: { commit: any }, user) {
      axios.put(
        API_User_URL + "myprofile/pass/" + user.id,
        {
          id: user.id,
          email: user.hidemail,
          password: user.password,
        },
        {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        }
      );
    },

    // Utilisation du Store pour changer son propre profil
    changeProfile({ commit }: { commit: any }, userDetail) {
      console.log("userdetail send in back >>", userDetail)
      axios.put(
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
        commit("SETUSERDETAIL", theUser.data.data);
      });

    },

    // Utilisation du Store pour supprimer son propre profil
    deleteProfile({ commit }: { commit: any }) {
      axios.put(
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
      );
    },

    // Utilisation du Store pour changer son profil
    deleteProfileAdmin({ commit }: { commit: any }, usertoDelete) {
      console.log("userDetail>>", usertoDelete);
      axios.put(
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
      );
    },

    // Utilisation du Store pour changer son rôle
    changeRole({ commit }: { commit: any }, usertoChange) {
      axios.put(
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
      );
      axios
      .get(API_User_URL + "profile/" + usertoChange.idToChange, {
        headers: {
          "x-access-token": myHead.accessToken,
          "x-role-token": myHead.roleToken,
        },
      })
      .then((theUser: any) => {
        commit("SETUSERDETAIL", theUser.data.data);
      });

    },

    getUser({ commit }: { commit: any }, userId) {
      axios
        .get(API_User_URL + "profile/" + userId.id, {
          headers: {
            "x-access-token": myHead.accessToken,
            "x-role-token": myHead.roleToken,
          },
        })
        .then((theUser: any) => {
          commit("SETUSERDETAIL", theUser.data.data);
          console.log('inside the user data // ', theUser.data.data)
        });
    },

    async getUsers({ commit }: { commit: any }) {
      axios
        .get(API_User_URL + "profile/", {
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
    allUsers(state) { return state.usersList},
    currentUser(state) {return state.userDetail},
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
