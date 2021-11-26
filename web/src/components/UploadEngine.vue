<template>
  <div>
    <div class="row">
      <div class="col-8">
        <label class="btn btn-default p-0">
          <input type="file" accept="image/*" id="myFile" @change="selectImage" />
        </label>
      </div>

      <div class="col-4">
        <button
          class="btn btn-success btn-sm float-right"
          :disabled="!currentImage"
          @click="upload"
        >Upload</button>
      </div>
    </div>

    <div v-if="currentImage" class="progress">
      <div
        class="progress-bar progress-bar-info"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >{{ progress }}%</div>
    </div>

    <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" />
      </div>
    </div>

    <div v-if="message" class="alert alert-secondary" role="alert">{{ message }}</div>

    <div class="card mt-3">
      <div class="card-header">List of Images</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(image, index) in imageInfos" :key="index">
          <a :href="image.url">{{ image.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import UploadService from "../services/UploadFilesService";

// export default {
//   name: "upload-image",
//   data() {
//     return {
let currentImage:(string | undefined | any | undefined)  = undefined;
let previewImage = '';
let progress = 0;
let message = "";
let imageInfos:([] | string | any) = [];
//   };
// },
// methods: {
const selectImage = () => {
  let myFile = (document.querySelector('#myFile') as HTMLInputElement).files!;
  console.log('myFile >>>' , myFile);
  currentImage = myFile.item(0);
  console.log('myFile.item(0) >>>' , myFile.item(0));
  previewImage = URL.createObjectURL(currentImage);
  progress = 0;
  message = "";
};
const upload = () => {
  progress = 0;

  UploadService.upload(currentImage, (event) => {
    progress = Math.round((100 * event.loaded) / event.total);
  })
    .then((response: any) => {
      message = response.data.message;
      return UploadService.getFiles();
    })
    .then((images) => {
      imageInfos = images.data;
    })
    .catch((err) => {
      progress = 0;
      message = "Could not upload the image! " + err;
      currentImage = undefined;
    });
};
// },
onMounted(() => {
  UploadService.getFiles().then(response => {
    imageInfos = response.data;
  });
});

</script>