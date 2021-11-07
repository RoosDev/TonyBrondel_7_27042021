<template>
  <div id="PostText" class="col-12">
    <!-- <form id="postTextForm" v-on:submit.prevent="sendMyPost">
      <div id="PostwriteContent">
        <label for="PostContent">
          <h2>Lâchez nous vos pensées...</h2>
        </label>
        <textarea
          name="PostContent"
          id="PostContent"
          cols="65"
          rows="6"
          v-model="theNewPost.content"
          autocapitalize="sentence"
          form="postTextForm"
          maxlength="650"
          placeholder="Saisissez ici votre prose..."
          required
          autofocus
        >{{ content }}</textarea>
        <button id="sendButton" class="col-9" type="submit" :disabled="!isFormValid">Poster</button>
      </div>
    </form> -->
    <div id="messageFormSent" class="hidebox" ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "changeTextForm",
  // props: {
  //   postId: Number,
  //   theNewPost: {
  //       content: String,
  //       userId: 1
  //     }
  // },
  // setup(props) {

  //   const urlApi = "http://localhost:3001/api/feed/" + props.postId;

  //   const sendMyPost = () => {
  //     const messageAfterSent = document.querySelector('#messageFormSent')! as HTMLDivElement;
  //     const PostContent = document.querySelector('#PostContent')! as HTMLTextAreaElement;
  //     const sendButton = document.querySelector('#sendButton')! as HTMLButtonElement;
  //     axios.put(urlApi, props.theNewPost)
  //       .then((res) =>{ 
  //         sendButton.textContent = 'Modification en-cours...';
  //         sendButton.setAttribute("disabled","");
  //         messageAfterSent.classList.toggle("hidebox");
  //         messageAfterSent.classList.remove("nokSent");
  //         messageAfterSent.classList.add("okSent");
  //         messageAfterSent.innerHTML= '<p>Modification enregistrée.</p>';
  //         setTimeout(function(){
  //           messageAfterSent.classList.toggle("hidebox");
  //           sendButton.textContent = 'Poster';
  //           PostContent.value='';
  //         },5000);
  //         console.log('Post en ligne ;)' + res)})
  //       .catch(error => {
  //         sendButton.setAttribute("disabled","");
  //         messageAfterSent.classList.toggle("hidebox");
  //         messageAfterSent.classList.remove("okSent");
  //         messageAfterSent.classList.add("nokSent");
  //         messageAfterSent.innerHTML= '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
  //         setTimeout(function(){
  //           messageAfterSent.classList.toggle("hidebox");
  //         },5000);
  //         console.error("There was an error!", error);
  //       });
  //   }
  
  //   const isFormValid = () => {
  //     if (
  //       props.theNewPost.content !== ""
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
      
  //   return {
  //     sendMyPost,
  //     isFormValid
  //   }
  // },
});


</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    margin: 35px auto 0 auto;
    text-align: center;
  }

  textarea {
    display: block;
    resize: none;
    margin: 50px auto 0 auto;
    border: 1px solid rgba($groupo-color4, 0.5);
    background-color: rgba($groupo-color4, 0.2);
    border-radius: 10px;

    &:hover {
      background-color: transparent;
    }
  }

  button {
    display: block;
    height: 40px;
    margin: 70px auto 50px auto;
    border: 1px solid $groupo-color1;
    border-radius: 10px;
    background-color: #92ff92;
    color: #006500;

    &:hover {
      border: 1px solid #006500;
      border-radius: 10px;
      background-color: rgba($likeColor, 0.5);
      font-weight: bold;
    }

    &:disabled {
      border: 1px solid #650000;
      border-radius: 10px;
      background-color: rgba($groupo-color4, 0.2);
      font-style: italic;
      color: $groupo-color1;
    }
  }

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }
  
  #messageFormSent{
    width: 70%;
    height: 40px;
    border-radius: 15px;
    p{
      text-align: center;
      font-weight: bold;
      margin-top: 7px;
      margin-bottom: 10px;
    }
  }
  .okSent{
    background-color: #c8ffc8;
    p {
    color: #006500;

    }
  }    
  .nokSent{
    background-color: #ffc8c8;
    p {
    color: #650000;

    }
  }    
}
</style>