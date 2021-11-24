import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    const formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/feed/upload");
  }
}

export default new UploadFilesService();