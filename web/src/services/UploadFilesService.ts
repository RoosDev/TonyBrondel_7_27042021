import axios from "axios";

class UploadFilesService {
  upload(file, onUploadProgress) {
    const myHead = JSON.parse(localStorage.getItem("user")!);
    const formData = new FormData();

    formData.append("file", file);

    return axios.post("http://localhost:3001/api/feed/upload", formData, {
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
    return axios.get("http://localhost:3001/api/feed/upload", {
      headers: {
        "x-access-token": myHead.accessToken,
        "x-role-token": myHead.roleToken,
      },
    });
  }
}

export default new UploadFilesService();
