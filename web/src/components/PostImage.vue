<template>
  <div id="PostImg" class="col-12">
    <form id="PostImgForm">
      <div id="PostImgContent">
        <h2>Affichez cette image sur la place publique </h2>
        <label id="labelSendPicture" for="inputSendPicture">Sélectionner un fichier</label>
        <input type='file' id="inputSendPicture" accept="image/*.jpg, image/*.jpeg, image/*.png, image/*.gif">
        <div id="quickDisplayImg">Aucune image sélectionnée</div>
        <button id="sendButton" class="col-9" type="submit" :disabled="!isFormValid">Poster</button>
      </div>
    </form>
    <div id="messageFormSent" class="hidebox" ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "postTextForm",
  data() {
    return {
    errorMessage: '',
      theNewPost: {
        image_URL: '',
        userId: 1
      }
    };
  },

  methods: {
    sendMyPost(){
      const messageAfterSent = document.querySelector('#messageFormSent') as HTMLDivElement;
      const PostContent = document.querySelector('#PostContent') as HTMLTextAreaElement;
      const sendButton = document.querySelector('#sendButton') as HTMLButtonElement;

      axios.post("http://localhost:3001/api/feed", this.theNewPost)
        .then((res) =>{ 
          sendButton.textContent = 'Envoi en-cours...';
          sendButton.setAttribute("disabled","");
          messageAfterSent.classList.toggle("hidebox");
          messageAfterSent.classList.remove("nokSent");
          messageAfterSent.classList.add("okSent");
          messageAfterSent.innerHTML= '<p>Message envoyé avec succès.</p>';
          setTimeout(function(){
            messageAfterSent.classList.toggle("hidebox");
            sendButton.textContent = 'Poster';
            PostContent.value='';
          },5000);
          console.log('Post en ligne ;)' + res)})
        .catch(error => {
          sendButton.setAttribute("disabled","");
          messageAfterSent.classList.toggle("hidebox");
          messageAfterSent.classList.remove("okSent");
          messageAfterSent.classList.add("nokSent");
          messageAfterSent.innerHTML= '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
          setTimeout(function(){
            messageAfterSent.classList.toggle("hidebox");
          },5000);

          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      }
  },
  computed: {
    isFormValid() {
      if (
        this.theNewPost.image_URL !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    
  },

});


</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostImg {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #labelSendPicture {
    display: block;
    margin-top: 50px;
    padding: 14px 45px;
    background: $ValidColor1;
    color: $color-white;
    font-size: 1em;
    transition: all 0.4s;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;

    &:hover {
      font-weight: bold;
      color: $groupo-color4;
      border: 1px solid $groupo-color1;
    }
  }

  #inputSendPicture {
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

  button {
    display: block;
    height: 40px;
    margin: 70px auto 50px auto;
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

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>