import axios from "axios";

const API_URL = "http://localhost:3001/api/";

const user = JSON.parse(localStorage.getItem("user")!);

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return axios.get(API_URL+"feed", {
        headers: { "x-access-token": user.accessToken },
      });
    } else {
      return {};
    }
  }

  getManagerBoard() {
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return axios.get(API_URL + "manager", {
        headers: { "x-access-token": user.accessToken },
      });
    } else {
      return {};
    }
  }

  getAdminBoard() {
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return axios.get(API_URL + "admin", {
        headers: { "x-access-token": user.accessToken },
      });
    } else {
      return {};
    }
  }
}

export default new UserService();
