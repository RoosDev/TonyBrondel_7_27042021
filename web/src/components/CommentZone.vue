<template>
  <div id="CommentList" :name="theIdPost" class="col-12">
    <!-- Ici sont intégrés les commentaires -->
    <div id="bubbleNoComment" v-if="!props.theComments?.[0]">
      <p>Il n'y a pas encore de commentaire. Soyez le premier.</p>
    </div>
    <div
      id="commentBubble"
      class="col-12"
      v-else
      v-for="theComment in props.theComments"
      :key="theComment.reference"
    >
      <BubbleComment :theComment="theComment" />
    </div>
  </div>
  <div :id="divCommentSend" class="CommentSend">
    <form class="row align-items-center" v-on:submit.prevent="sendMyComment">
      <div :id="divTextareaZone" class="textareaZone col-10">
        <textarea
          name="sendTxtComment"
          :id="textareaSendPost"
          class="sendPost"
          rows="2"
          v-model="theNewComment.content"
          maxlength="350"
          placeholder="Saisissez votre commentaire ici (max.: 350 caractères)"
          autocapitalize="sentences"
        ></textarea>
      </div>
      <div :id="buttonSendComment" class="buttonSendZone col-2">
        <button class="buttonForm" type="submit">
          <font-awesome-icon
            id="paperPlaneIcon"
            class="styleButtonAwesome"
            :icon="['fas', 'paper-plane']"
          />
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import store from '../store/index';
import BubbleComment from '@/components/BubbleComment.vue';
import { useRouter } from 'vue-router';

const myStore: any = store;
const myRouter: any = useRouter();

const props = defineProps<{
  theIdPost: number,
  theComments: { any },
}>();

// Définition de l'ID utilisateur (avec le localstorage)
const currentUser = computed(() => myStore.state.auth.user);

// récupération des commentaires 
// const commentsList1 = computed(() => myStore.state.commentList);
// const commentsList = computed(() => store.getters.theComments.find(theComment => theComment.reference == props.theIdPost ))

// Nouvel objet à envoyer en base
let theNewComment = ref({
  theIdPost: props.theIdPost,
  content: '',
  userId: currentUser.value.id,
});

// Nom dynamique des id pour les commentaires
const divCommentSend = 'CommentSend_' + props.theIdPost;
const divTextareaZone = 'textareaComment_' + props.theIdPost;
const textareaSendPost = 'sendTxtComment_' + props.theIdPost;
const buttonSendComment = 'sendComment_' + props.theIdPost;


// Fonction d'envoi du commentaire avec action / animation lié à l'envoi
const sendMyComment = () => {
  // const user = JSON.parse(localStorage.getItem("user")!);
  let commentContent = document.querySelector(`#textareaComment_${props.theIdPost}`) as HTMLTextAreaElement;
  const sendCommentButton = document.querySelector(`#sendComment_${props.theIdPost}`) as HTMLDivElement;

  //Envoi de la requete via vuex et axios
  myStore.dispatch("createComment", theNewComment.value)
    .then(() => {
      sendCommentButton.innerHTML = `<svg class="rotate svgComment" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`;
      sendCommentButton.setAttribute("disabled", "");
      setTimeout(() => {
        commentContent.value = '';
        sendCommentButton.innerHTML = `<svg class="svgComment" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`;
      }, 1000);
      setTimeout(() => {
        myRouter.go('')
      }, 1500);
    })
    .catch(error => {
      sendCommentButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
      console.error("There was an error!", error.message);
    });
};



// const isCommentValid = computed(() => {
//   if (
//     theNewComment.content !== ""
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// });

</script>
<style lang="scss">
@import "../scss/variables.scss";

#commentZone {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0;

  #CommentList {
    height: 250px;
    align-items: center;
    top: 5px;
    margin-top: 0;
    margin-bottom: 5px;
    overflow-y: auto;
    scrollbar-width: 5px;
    scrollbar-color: $groupo-color1;

    #commentBubble,
    #bubbleNoComment {
      width: 95%;
      min-height: 50px;
      margin: 8px auto auto auto;
      border-radius: 10px;
      border: 1px solid rgba($groupo-color3, 0.3);
      color: $groupo-color4;

      #bubbleText {
        font-size: 0.8em;
        text-align: justify;

        p {
          margin: 10px;
        }
      }

      #bubbleAuthor {
        text-align: right;
        font-size: 0.7em;
        font-style: italic;

        p {
          margin: 0 10px 0 auto;
        }
      }
    }
    #bubbleNoComment p {
      font-size: 0.9em;
      text-align: center;
      font-weight: bold;
      line-height: 100%;
      margin-top: 15px;
    }
  }

  .CommentSend {
    height: 60px;
    width: 95%;
    margin: 3px;
    border-top: 1px solid $groupo-color3;
    align-self: baseline;
    padding-top: 10px;

    .textareaZone {
      height: 50px;
      width: 85%;
      margin: 0;
      border-radius: 10px 0 0 10px;
      background-color: $groupo-colorLight3;

      .sendPost {
        background-color: transparent;
        width: 100%;
        margin: 3px 0 2px 0;
        font-size: 0.8em;
        border-radius: 10px;
        border: none;
        outline: none;
        resize: none;

        &:hover {
          border-bottom: 1px solid rgba($groupo-color1, 0.3);
        }

        &:focus {
          border-bottom: 1px solid rgba($groupo-color1, 0.6);
        }
      }
    }

    .buttonSendZone {
      width: 15%;
      height: 50px;
      border-radius: 0 10px 10px 0;
      background-color: $groupo-colorLight3;
      line-height: 100%;

      .buttonForm,
      .svgComment {
        border: 0;
        background-color: transparent;
        color: $groupo-color1;
        border: 0;
        background-color: transparent;
        margin: auto auto auto 0;
        color: $groupo-color1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .styleButtonAwesome {
          margin: auto;
          margin-left: -50%;
          font-size: 2.5em;
          z-index: 5;
          text-align: center;
        }
        &:hover {
          .styleButtonAwesome {
            font-size: 3.5em;
          }
        }
      }
    }
  }
}
.bubbledeleteComment {
  // position: absolute;
  width: 25px;
  height: 25px;
  margin: -12px auto auto -12px;
  z-index: 500;
}

.hidebox {
  display: none;
}

.rotate {
  animation: rotation 500ms;
  animation-iteration-count: 10;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media (max-width: 991.99px) {
  #commentZone {
    height: 400px;
    margin-bottom: 5px;

    #CommentList {
      height: 325px;

      .CommentSend {
        height: 75px;

        .textareaZone {
          height: 75px;
        }
      }
    }
  }
}
@media (max-width: 575.99px) {
  #commentZone {
    .CommentSend {
      height: 40px;
      margin: 3px;
      .textareaZone {
        height: 40px;
        .sendPost {
          margin-top: 5px;
        }
      }
      .buttonSendZone {
        height: 40px;
        .buttonForm {
          margin-top: 5px;
          .styleButtonAwesome {
            margin-left: -50%;
          }
        }
      }
    }
  }
  .bubbledeleteComment {
  // position: absolute;
  width: 25px;
  height: 25px;
  margin: -5px auto auto -5px;
  z-index: 500;
}


}
</style>