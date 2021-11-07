<template>
  <div id="DeletePost" class="col-12">
    <form id="postTextForm" v-on:submit.prevent="deleteMyPost">
      <div id="PostwriteContent">
        <label for="PostContent">
          <h2>Voulez-vous vraiment supprimer ce post ?</h2>
        </label>
        <button id="confirmDelete" class="col-9" type="submit">Confirmer la suppression</button>
      </div>
    </form>
    <div id="messageFormDelete" class="hidebox"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "deletePost",
  props: {
    postId: Number
  },
  setup(props, context) {

    const urlApi = "http://localhost:3001/api/feed/" + props.postId;
    console.log("urlApi ::>> " + urlApi);
    const deleteMyPost = () => {
      const messageAfterDelete = document.querySelector('#messageFormDelete')! as HTMLDivElement;
      const sendButton = document.querySelector('#confirmDelete')! as HTMLButtonElement;

      axios.delete(urlApi)
        .then((res) => {
          sendButton.textContent = 'Suppression en-cours...';
          sendButton.setAttribute("disabled", "");
          setTimeout(function () {
          messageAfterDelete.classList.toggle("hidebox");
          messageAfterDelete.classList.remove("nokSent");
          messageAfterDelete.classList.add("okSent");
          messageAfterDelete.innerHTML = '<p>Message supprimé avec succès.</p>';
          sendButton.textContent = 'supprimé';
          }, 3000);
          setTimeout(() => {
            messageAfterDelete.classList.toggle("hidebox");
          }, 6000);
          console.log('Post en ligne ;)' + res)
        })
        .catch(err => {
          sendButton.setAttribute("disabled", "");
          messageAfterDelete.classList.toggle("hidebox");
          messageAfterDelete.classList.remove("okSent");
          messageAfterDelete.classList.add("nokSent");
          messageAfterDelete.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
          setTimeout(function () {
            messageAfterDelete.classList.toggle("hidebox");
          }, 5000);
          console.error("There was an error!", err);
        });
    }
    return {
      deleteMyPost
    }
  },
});


</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }
}
#confirmDelete {
  display: block;
  height: 60px;
  margin: 70px auto 50px auto;
  border: 1px solid $groupo-color1;
  border-radius: 10px;
  background-color: #c8ffc8;
  color: #006500;

  &:hover {
    border: 1px solid #006500;
    border-radius: 10px;
    background-color: #ffc8c8;
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
#messageFormDelete {
  margin: auto;
  width: 70%;
  height: 40px;
  border-radius: 15px;
  p {
    text-align: center;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 10px;
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
</style>