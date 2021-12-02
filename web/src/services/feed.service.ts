import axios from "axios";

const API_FEED_URL = "http://localhost:3001/api/feed/";

const myHead = JSON.parse(localStorage.getItem("user")!);

class FeedService {
  getPosts() {
    return axios.get("http://localhost:3001/api/feed", {
      headers: {
        "x-access-token": myHead.accessToken,
        "x-role-token": myHead.roleToken,
      },
    });
  }

  addComment(comment) {
    return axios.put(API_FEED_URL + comment.id + "/comment",
      {
        id: myHead.id,
        content: comment.theNewComment.content,
      },
      {
        headers: {
          "x-access-token": myHead.accessToken!,
          "x-role-token": myHead.roleToken!,
          "id": myHead.id!
        },
      }
    );
  }

  createPost(theNewPost) {
    console.log('new post inside >> ',theNewPost);
    return axios.post(API_FEED_URL, theNewPost,
      {
        headers: {
          "x-access-token": myHead.accessToken!,
          "x-role-token": myHead.roleToken!,
        },
      }
    );
  }
  
}

export default new FeedService();
