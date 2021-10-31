import http from "../http-common";

class SignupService {
//   getAll() {
//     return http.get("/tutorials");
//   }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

  create(data:any) {
    return http.post("/signup", data);
  }

}

export default new SignupService();