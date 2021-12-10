import axios from "axios";
import store from "../store/index";
import { computed } from "vue";
import { mapMutations } from "vuex";
const myStore: any = store;

class UploadFilesService {
  upload(file, onUploadProgress) {
    const myHead = JSON.parse(localStorage.getItem("user")!);
    const formData = new FormData();

    formData.append("file", file);

    //   return myStore.dispatch("createPostImage", formData,
    //     onUploadProgress,);
    // }

    return axios.post("http://localhost:3001/api/feed/upload/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": myHead.accessToken,
        "x-role-token": myHead.roleToken,
      },
      onUploadProgress,
    });
  }

  uploadProfileImage(file, onUploadProgress) {
    const storeCurrentUser = computed(() => myStore.state.auth.user);
    const storageCurrentUser = JSON.parse(localStorage.getItem("user")!);
    let currentUser: any;
    if (!storeCurrentUser.value) {
      currentUser = storageCurrentUser;
    } else {
      currentUser = storeCurrentUser.value;
    }

    const formData = new FormData();

    formData.append("file", file);

    return axios.put(
      "http://localhost:3001/api/auth/upload/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": currentUser.accessToken,
          "x-role-token": currentUser.roleToken,
          id: currentUser.id,
        },
        onUploadProgress,
      }
    );
  }

  getFiles() {
    const currentUser = computed(() => myStore.state.auth.user);
    const myId = currentUser.value.id!;
    const myaccessToken = currentUser.value.accessToken!;
    const myroleToken = currentUser.value.roleToken!;

    // Connexion au Store de l'application
    myStore.dispatch("getPosts", {
      id: myId,
      accessToken: myaccessToken,
      roleToken: myroleToken,
    });
  }
}

export default new UploadFilesService();
