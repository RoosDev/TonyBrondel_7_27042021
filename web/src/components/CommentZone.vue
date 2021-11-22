<template>
  <div id="CommentList" :name="theIdPost" class="col-12">
    <!-- Ici sont intégrés les commentaires -->
    <div id="bubbleNoComment" v-if="!theComments?.[0]">
      <p>Il n'y a pas encore de commentaire. Soyez le premier.</p>
    </div>
    <div
      id="commentBubble"
      class="col-12"
      v-else
      v-for="theComment in theComments"
      :key="theComment.reference"
    >
      <div id="bubbleText" class="col-12">
        <p>{{ theComment.content }}</p>
      </div>
      <div id="bubbleAuthor" class="col">
        <p>{{ theComment.authorComment.firstname }} {{ theComment.authorComment.lastname }} - {{ theComment.updatedAt }}</p>
      </div>
    </div>
  </div>
  <div :id="divCommentSend" class="CommentSend">
    <form class="row align-items-center" v-on:submit.prevent="sendMyComment">
      <div :id="divTextareaZone" class="textareaZone col-10">
        <textarea
          name="sendTxtComment"
          :id="textareaSendPost"
          class="sendPost"
          cols="60"
          rows="2"
          v-model="theNewComment.content"
          maxlength="350"
          placeholder="Saisissez votre commentaire ici (max.: 350 caractères)"
          autocapitalize="sentences"
        ></textarea>
      </div>
      <div :id="buttonSendComment" class="buttonSendZone col-2">
        <button type="submit" :disabled="!isCommentValid">
          <font-awesome-icon id="paperPlaneIcon"  class="styleButtonAwesome" :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import {  defineComponent } from 'vue';
// import formatDateMixin from '../mixins/formatDateMixin.js';
import axios from "axios";
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'postTxtComment',
  data() {
    return {
      errorMessage: '',
      theNewComment: {
        content: '',
        userId: 1
      }
    };
  },
  props: {
    theIdPost: Number,
    theComments: Object,
    theCommentAuthor: Object,

  },
  setup(props) {

// Nom dynamique des id pour les commentaires
    const divCommentSend = 'CommentSend_' + props.theIdPost;
    const divTextareaZone = 'textareaComment_' + props.theIdPost;
    const textareaSendPost = 'sendTxtComment_' + props.theIdPost;
    const buttonSendComment = 'sendComment_' + props.theIdPost;

    return {
      divCommentSend,
      divTextareaZone,
      buttonSendComment,
      textareaSendPost
    };
  },

  methods: {
    
    sendMyComment() {
      const user = JSON.parse(localStorage.getItem("user")!);
      let commentContent = document.querySelector(`#textareaComment_${this.theIdPost}`) as HTMLTextAreaElement;
      const sendCommentButton = document.querySelector(`#sendComment_${this.theIdPost}`) as HTMLDivElement;
      const myRouter: any = useRouter();

      axios.post("http://localhost:3001/api/feed/" + this.theIdPost + "/comment", this.theNewComment,{
          headers: { "x-access-token": user.accessToken!, "x-role-token": user.roleToken! },})
        .then(() => {
          sendCommentButton.innerHTML = `<svg class="w-6 h-6 rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`;
          sendCommentButton.setAttribute("disabled", "");
          setTimeout(() => {
            commentContent.value = '';
            sendCommentButton.innerHTML = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`;
          }, 2000);
          setTimeout(() => {
            myRouter.go();
          }, 4000);
          console.log('Commentaire enregistré ;)' )
        })
        .catch(error => {
          // sendCommentButton.setAttribute("disabled", "");
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    }, 
  },
  computed: {
    isCommentValid() {
      if (
        this.theNewComment.content !== ""
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
    margin: 0 auto 5px auto;
    border-top: 1px solid $groupo-color3;
    align-self: baseline;
    padding-top: 10px;

    .textareaZone {
      height: 50px;
      border-radius: 10px 0 0 10px;
      background-color: $groupo-colorLight3;

      .sendPost {
        background-color: transparent;
        margin: 5px auto 0 auto;
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
      width: 75px;
      height: 50px;
      border-radius: 0 10px 10px 0;
      background-color: $groupo-colorLight3;
      line-height: 100%;

      button, svg{
        border: 0;
        background-color: transparent;
        margin: auto;
        color: $groupo-color1;

        .styleButtonAwesome {
          // margin-top: 20px;
          // margin-left: -25px;
          margin: auto;
          font-size: 2.7em;
          z-index: 5;
          // transition: all 400ms;
        }
      }

      // &:hover {
      //   #paperPlaneIcon {
      //     margin-top: -20px;
      //     margin-left: +25px;
      //     font-size: 0.2em;
      //   }
      // }
    }
  }
}
.hidebox {
  display: none;
}

.rotate{
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
</style>