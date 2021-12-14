<template>
  <div id="ProfileImg" class="col-12">
    <div id="ProfileImgForm" class="row">
      <div id="ProfileImgContent" class="col-8">
        <h2 class="uploadImageH2">Votre photo de profil</h2>
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
          :disabled="!activeButtonProfile"
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

    <div id="uploadImgMessage" class="alert alert-secondary hidebox" role="alert">{{ message }} bro</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import UploadService from "../services/UploadFilesService";
import store from '../store/index';
import { useRouter } from "vue-router";

const myRouter: any = useRouter();

// Déclaration des variables réactives pour l'upload
let activeButtonProfile = ref(false);
let currentImage: (any) = ref('');
let myFileName: (any) = ref()
let previewImage = ref('');
let progress = ref(0);
let message = ref("");


const selectImage = () => {
  let myFile = (document.querySelector('#myFile') as HTMLInputElement).files!;
  activeButtonProfile.value = true
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

  UploadService.uploadProfileImage(currentImage, (event) => {
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
        store.commit('SETUSERDETAIL');
        myRouter.go('');

      }, 1500);
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

#ProfileImg {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #ProfileImgForm {
    width: 100%;
  }
  #ProfileImgContent {
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
    font-weight: bold;
    margin-top: 15px;
  }

  #labelSendPicture {
    display: block;
    width: 50%;
    height: 45px;
    margin: 25px auto 25px auto;
    padding: auto;
    background: $ValidColor1;
    color: $color-white;
    transition: all 0.4s;
    cursor: pointer;
    border: 1px solid;
    border-radius: 10px;
    text-align: center;
    font-size: 1.4em;

    &:hover {
      font-weight: bold;
      color: $groupo-color4;
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
    padding: 10px 0;
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
    max-width: 150px;
    width: 100%;
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
    max-width: 40%;
    max-height: 40%;
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
  #ProfileImg {
    overflow-y: scroll;
    #labelSendPicture {
      width: 75%;
      font-size: 0.8em;
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