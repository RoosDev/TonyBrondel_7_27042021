<template>
  <div id="PostImg" class="col-12">
    <div id="PostImgForm" class="row">
      <div id="PostImgContent" class="col-8">
        <h2 class="uploadImageH2">Affichez cette image sur la place publique</h2>
        <label class="btn btn-default p-0" id="labelSendPicture" for="myFile">
          Sélectionner un fichier
          <input
            type="file"
            accept="image/*.jpg, image/*.jpeg, image/*.png, image/*.gif"
            id="myFile"
            @change="selectImage"
          />
        </label>
      </div>

      <div id="divButtonUpload" class="col-8">
        <button
          id="buttonSendImage"
          class="btn btn-success btn-sm float-right"
          :disabled="!activeButton"
          @click="upload"
        >Enregistrer {{ myFileName }}</button>
      </div>
    </div>

    <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated progress-bar-info"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >{{ progress }}%</div>
    </div>

    <div v-if="previewImage">
      <div id="previewImgPost">
        <img id="imgPreviewPost" class="preview my-3" :src="previewImage" />
      </div>
    </div>

    <div id="uploadImgMessage" class="alert alert-secondary hidebox" role="alert">{{ message }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import UploadService from "../services/UploadFilesService";
import store from "../store/index";
import { useRouter } from "vue-router";

const myRouter: any = useRouter();

let activeButton = ref(false);
let currentImage: (any) = ref('');
let myFileName: (any) = ref()
let previewImage = ref('');
let progress = ref(0);
let message = ref("");

const selectImage = () => {
  let myFile = (document.querySelector('#myFile') as HTMLInputElement).files!;
  activeButton.value = true
  currentImage = myFile.item(0)!;
  myFileName = myFile.item(0)!.name;
  previewImage.value = URL.createObjectURL(currentImage);
  progress.value = 0;
  message.value = "";
};
const upload = () => {
  progress.value = 0;
  const messageUploadImg = document.querySelector('#uploadImgMessage')! as HTMLDivElement;
  const buttonSendImage = document.querySelector('#buttonSendImage')! as HTMLButtonElement;

  UploadService.upload(currentImage, (event) => {
    progress.value = Math.round((100 * event.loaded) / event.total);
  })

    .then((response: any) => {
      message = response.data.message;
      // return UploadService.getFiles();
    })
    .then((images) => {
      buttonSendImage.textContent = 'Envoi en-cours...';
      buttonSendImage.setAttribute("disabled", "");
      setTimeout(() => {
        messageUploadImg.classList.toggle("hidebox");
        messageUploadImg.classList.remove("nokSent");
        messageUploadImg.classList.add("okSent");
        messageUploadImg.innerHTML = '<p>Image postée</p>';
        messageUploadImg.classList.toggle("hidebox");
        buttonSendImage.textContent = 'Envoyé';
      }, 1500);
      setTimeout(() => {
        messageUploadImg.classList.toggle("hidebox");
        store.commit('SETFEEDLIST');
        myRouter.go('');

      }, 2500);
    })
    .catch((err) => {
      progress.value = 0;
      message.value = "Could not upload the image! " + err;
      currentImage = undefined;
    });
};

onMounted(() => {
  UploadService.getFiles()
});

</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostImg {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #PostImgContent {
    width: 100%;
  }

  #divButtonUpload {
    width: 100%;
  }

  #labelSendPicture {
    display: block;
    width: 300px;
    height: 60px;
    margin: 50px auto 50px auto;
    padding: auto;
    background: $ValidColor1;
    color: $color-white;
    transition: all 0.4s;
    cursor: pointer;
    border: 1px solid;
    border-radius: 10px;
    text-align: center;
    font-size: 1.5em;

    &:hover {
      font-weight: bold;
      color: $groupo-color4;
      border: 1px solid $groupo-color1;
    }
  }

  #myFile {
    display: block;
    width: 225px;
    top: 0;
    left: 0;
    margin: 50px auto 0 auto;
    border: 1px solid rgba($groupo-color1, 0.5);
    background-color: rgba($groupo-color4, 0.2);
    border-radius: 10px;
    position: absolute;
    opacity: 0;
    padding: 14px 0;
    cursor: pointer;

    &:hover {
      background-color: transparent;
    }
  }

  #quickDisplayImg {
    display: block;
    margin: 25px auto 25px auto;
    text-align: center;
    font-size: 1.2em;
    color: $groupo-color4;
  }

  #buttonSendImage {
    display: block;
    width: 150px;
    height: 50px;
    margin: 10px auto 20px auto;
    border: 1px solid $groupo-color1;
    border-radius: 10px;
    background-color: rgba($groupo-color4, 0.2);
    color: $groupo-color1;

    &:hover {
      border: 2px solid #006500;
      border-radius: 15px;
      background-color: rgba($likeColor, 0.5);
      color: #006500;
      font-weight: bold;
    }
  }

  .uploadImageH2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
    margin-top: 50px;
  }
}
#previewImgPost {
  width: 250px;
  height: 250px;

  #imgPreviewPost {
    max-width: 95%;
    max-height: 95%;
  }
}

.progress {
  width: 80%;
  margin: 10px auto 30px auto;
}
</style>