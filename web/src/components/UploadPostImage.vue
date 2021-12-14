<template>
  <div id="PostImg" class="col-12">
    <div id="PostImgForm" class="row">
      <div id="PostImgContent" class="col-8">
        <h2 class="uploadImageH2">Affichez cette image sur la place publique</h2>
        <p>
          <em>formats acceptés : .jpg/.png/.gif</em>
        </p>
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

    <div id="previewImgPost" v-if="previewImage">
      <img id="imgPreviewPost" class="preview my-3" :src="previewImage" />
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
    })
    .then((images) => {
      buttonSendImage.setAttribute("disabled", "");
      buttonSendImage.textContent = 'Envoi en-cours...';
      messageUploadImg.classList.toggle("hidebox");
      messageUploadImg.classList.remove("nokSent");
      messageUploadImg.classList.add("okSent");
      messageUploadImg.innerHTML = '<p>Image postée</p>';
      messageUploadImg.classList.toggle("hidebox");
      buttonSendImage.textContent = 'Envoyé';
      setTimeout(() => {
        buttonSendImage.classList.toggle("hidebox");
        store.commit('SETFEEDLIST');
        myRouter.go('');

      }, 1000);
    })
    .catch((error) => {
      let msgError = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

      buttonSendImage.setAttribute("disabled", "");
      messageUploadImg.classList.toggle("hidebox");
      messageUploadImg.classList.remove("okSent");
      messageUploadImg.classList.add("nokSent");
      messageUploadImg.innerHTML = '<p>' + msgError + '</p>';
      buttonSendImage.textContent = 'Erreur d\'envoi';
      setTimeout(() => {
        messageUploadImg.classList.toggle("hidebox");
        buttonSendImage.textContent = 'Envoyer';
        buttonSendImage.removeAttribute("disabled")

      }, 3000);

      progress.value = 0;
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

  #PostImgForm {
    width: 100%;
  }

  #PostImgContent {
    width: 100%;
    p {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 0.9em;
      margin-top: -5px;
    }
  }

  #divButtonUpload {
    width: 100%;
  }
  .uploadImageH2 {
    font-size: 1.4em;
    text-decoration: underline;
    text-align: center;
    font-weight: bold;
    margin-top: 30px;
    color: $groupo-color5;
  }

  #labelSendPicture {
    display: block;
    width: 50%;
    height: 45px;
    margin: 25px auto 25px auto;
    padding: auto;
    background: $groupo-color5;
    color: $ValidColor1;
    transition: all 0.4s;
    cursor: pointer;
    border: 1px solid;
    border-radius: 10px;
    text-align: center;
    font-size: 1.5em;

    &:hover {
      font-weight: bold;
      color: $groupo-colorLight3;
      border: 1px solid $groupo-color1;
    }
  }
  #myFile {
    display: block;
    top: 0;
    left: 0;
    margin: 8px auto 0 auto;
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
    margin: 5px auto 5px auto;
    text-align: center;
    font-size: 1.2em;
    color: $groupo-color4;
  }

  #buttonSendImage {
    display: block;
    width: 150px;
    height: 50px;
    margin: 5px auto 5px auto;
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
  #previewImgPost {
    max-width: 50%;
    max-height: 50%;
    margin: 5px;

    #imgPreviewPost {
      max-width: 95%;
      max-height: 95%;
      margin: 0;
    }
  }

  #uploadImgMessage {
    width: 75%;
    height: 30px;
    margin: 10px;
    padding: 0;
    p{
      text-align: center;
      margin : 0;
      font-size: 1em;
    }
  }
}
.progress {
  width: 80%;
  margin: 5px auto 5px auto;
}
.okSent {
  background-color: #c8ffc8;
  p {
    color: #006500;
  }
}
.nokSent {
  background-color: #ffc8c8;
  p {
    color: #650000;
  }
}
@media (max-width: 767.99px) {
  #PostImg {
    overflow-y: scroll;
    #labelSendPicture {
      width: 75%;
      font-size: 1.0em;
    }
    #previewImgPost {
      max-width: 95%;
      max-height: 95%;

      #imgPreviewPost {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>