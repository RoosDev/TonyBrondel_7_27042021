import axios from "axios";

class UploadFilesService {
  upload(file, onUploadProgress) {
    const myHead = JSON.parse(localStorage.getItem("user")!);
    const formData = new FormData();

    console.log(formData)
    formData.append("file", file);  
    console.log("file", file)

    return axios.post("http://localhost:3001/api/feed/upload/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": myHead.accessToken,
        "x-role-token": myHead.roleToken,
      },
      onUploadProgress,
    });
  }

  getFiles() {
    const myHead = JSON.parse(localStorage.getItem("user")!);
    return axios.get("http://localhost:3001/api/feed/", {
      headers: {
        "x-access-token": myHead.accessToken,
        "x-role-token": myHead.roleToken,
      },
    });
  }
}

export default new UploadFilesService();
