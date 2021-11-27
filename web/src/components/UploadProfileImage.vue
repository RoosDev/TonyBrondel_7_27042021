<template>
  <div id="ProfileImgImg" class="col-12">
    <div id="ProfileImgImgForm" class="row">
      
      <div id="ProfileImgImgContent" class="col-8">
        <h2 class="uploadImageH2">Votre photo de profil</h2>
        <label class="btn btn-default p-0" id="labelSendPicture" for="myFileProfile">Sélectionner un fichier
          <input type="file" accept="image/*.jpg, image/*.jpeg, image/*.png, image/*.gif" id="myFileProfile" @change="selectImage" />
        </label>
      </div>

      <div id="divButtonUpload" class="col-8">
        <button
          id="buttonSendImage"
          class="btn btn-success btn-sm float-right"
          :disabled="!activeButtonProfImg"
          @click="upload"
        >Enregistrer {{ myFileNameProfImg }}</button>
      </div>
    </div>

    <div class="progressProfImg">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated progress-bar-info progressProfImg"
        role="progressbar"
        :aria-valuenow="progressProfImg"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progressProfImg + '%' }"
      >{{ progressProfImg }}%</div>
    </div>

    <div v-if="previewProfileImage">
      <div id="previewImgProfileImg">
        <img id="imgPreviewProfileImg" class="preview my-3" :src="previewProfileImage" />
      </div>
    </div>

    <div id="uploadImgMessage" class="alert alert-secondary hidebox" role="alert">{{ messageProfImg }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import UploadService from "../services/UploadFilesService";
import { useRouter } from "vue-router";

const myRouter: any = useRouter();

let activeButtonProfImg = ref(false);
let currentProfImage:(any)  = ref('');
let myFileNameProfImg:(any) = ref()
let previewProfileImage = ref('');
let progressProfImg = ref(0);
let messageProfImg = ref("");
let imageInfosProfImg:([] | string | any) = ref([]);

const selectImage = () => {
  let myFileProfile = (document.querySelector('#myFileProfile') as HTMLInputElement).files!;
  activeButtonProfImg.value = true
  currentProfImage = myFileProfile.item(0)!;
  myFileNameProfImg = myFileProfile.item(0)!.name;
  previewProfileImage.value = URL.createObjectURL(currentProfImage);
  progressProfImg.value = 0;
  messageProfImg.value = "";
};
const upload = () => {
  progressProfImg.value = 0;
  const messageUploadImg = document.querySelector('#uploadImgMessage')! as HTMLDivElement;
  const buttonSendImage = document.querySelector('#buttonSendImage')! as HTMLButtonElement;

  UploadService.uploadProfileImage(currentProfImage, (event) => {
    progressProfImg.value = Math.round((100 * event.loaded) / event.total);
  console.log('progressProfImg >>>' , progressProfImg);
  })
  
    .then((response: any) => {
      messageProfImg = response.data.messageProfImg;
      return UploadService.getFiles();
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
        myRouter.go('');
      }, 2500);
    })
    .catch((err) => {
      progressProfImg.value = 0;
      messageProfImg.value = "Could not upload the image! " + err;
      currentProfImage = undefined;
    });
};

onMounted(() => {
  UploadService.getFiles().then(response => {
    imageInfosProfImg = response.data;
  });
});

</script>
<style lang="scss">
@import "../scss/variables.scss";

#ProfileImgImg {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #ProfileImgImgContent{
    width: 100%;
  }

  #divButtonUpload{
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

  #myFileProfile {
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
#previewImgProfileImg{
  width: 250px;
  height: 250px;

  #imgPreviewProfileImg{
    max-width: 95%;
    max-height: 95%;
  }
}

.progressProfImg{
  width: 80%;
  margin: 10px auto 30px auto;
}
</style>