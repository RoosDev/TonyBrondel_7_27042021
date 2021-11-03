import http from "../http-common";

class FeedDataService {
    
    // les routes de récupération de données : GET
  getAllPosts() {
    return http.get("/feed");
  }

  // getOnePost(id:number) {
  //   return http.get(`/feed/${id}`);
  // }

  // getPostComments(id:number) {
  //   return http.get(`/feed/${id}/comment`);
  // }

  // getPostLikes(id) {
  //   return http.get(`/feed/${id}/like`);
  // }

  // getLikes() {
  //   return http.get(`/feed/likes`);
  // }

//     // les routes pour insérer des données en base :  POST

  createPost(data) {
    return http.post("/feed", data);
//   }

//   createComment(id,data) {
//     return http.post(`/feed/${id}/comment`, data);
//   }

//   addLike(id,data) {
//     return http.post(`/feed/${id}/like`, data);
//   }

//     //  Les routes pour mettre à jour des données : UPDATE

//   updatePost(id, data) {
//     return http.put(`/feed/${id}`, data);
//   }

//     //  Les routes pour supprimer des données : DELETE

//   deletePost(id) {
//     return http.delete(`/feed/${id}`);
//   }
    
//   deleteLike(id) {
//     return http.delete(`/feed/${id}/like`);
//   }
};

export default new FeedDataService();