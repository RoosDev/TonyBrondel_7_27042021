<template lang="fr">
    <div id="fullBloc" class="col-md-10">
        <div id="postBloc">
            <div id="timeLikeMenuZone" class="col-12">
                <span id="timePost" >
                <p> <img id="pictureAuthor" src="../assets/user-male.png" alt="Profil Picture"> {{ postAuthor }} - le {{ theDate }} </p>
                </span>
                <span id="likePost" >
                    <p><button><font-awesome-icon :icon="['fas', 'hand-peace']" /></button> {{ theLike }} </p>
                </span>
                <span id="menuPost" >
                    <button :id="buttonChangeDelete" class="openMenuPost" @click="toggleMenuPost">•••</button>
                    <div :id="menuDevelopChange" class="menuPostDevelop hidebox">
                      <button :id="buttonChange" class="menuPost_Change" @click="toggleModal_ChangePost"><p>Modifier</p></button>
                      <button :id="buttonDelete" class="menuPost_Delete" @click="toggleModal_DeletePost"><p>Supprimer</p></button>
                    </div>
                </span>
            </div>
            <div id="PostZone" class="col-md-6">
                <div id="thePostText" class="col-12">
                    <p>
                        {{ theTxtPost }} 
                    </p>
                </div>
            </div>
            <div id="commentZone" class="col-md-6">
                <div id="CommentList" :name="theIdPost" :key="theComments" class="col-12">
                    <!-- Ici sont intégrés les commentaires -->
                    <div id="bubbleNoComment" v-if="!theComments?.[0]">
                      <p>Il n'y a pas encore de commentaire. Soyez le premier. </p>
                    </div>
                    <div id="commentBubble" class="col-12" v-else v-for="theComment in theComments" :key="theComment.reference">
                      <div id="bubbleText" class="col-12">
                        <p> {{ theComment.content }} </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> {{ theComment.authorComment.firstname }} {{ theComment.authorComment.lastname }} -  {{ theComment.createdAt }}  </p>
                      </div>
                    </div>  
                </div>
                <div :id="divCommentSend" class="CommentSend">
                    <form class="row align-items-center" v-on:submit.prevent="sendMyComment" >
                        <div :id="divTextareaZone" class="textareaZone col-10" >
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
                        <div id="buttonSendZone" class="col-2">
                            <button type="submit"  :disabled="!isCommentValid" > <font-awesome-icon id="paperPlaneIcon" :icon="['fas', 'paper-plane']" /> </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="postFooter" class="col-6"><p></p></div>
    </div>
    <Modal @close="toggleModal_ChangePost" :modalActive="modalActive_ChangePost">
      <div class="modal-content">
        <ChangeText :postId="theIdPost" :oldContent="theTxtPost"/>
      </div>
    </Modal>
    <Modal @close="toggleModal_DeletePost" :modalActive="modalActive_DeletePost">
      <div class="modal-content">
        <DeletePost :postId="theIdPost"/>
      </div>
    </Modal>

</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import store from '../store/index';
// import formatDateMixin from '../mixins/formatDateMixin.js';
import Modal from '@/components/Modal.vue';
import ChangeText from '@/components/ChangeText.vue';
import DeletePost from '@/components/DeletePost.vue';
import { useModal } from '@/composition/modal';
import axios from "axios";


export default defineComponent({
  name: 'postTxtComment',
  components: {
    Modal,
    ChangeText,
    DeletePost
  },
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
    theTxtPost: String,
    theLike: Object,
    theAuthor: Object,
    theDate: String,
    theCommentAuthor: Object,
    theLikes: Object,

  },

  setup(props) {
    const myStore: any = store;
    const commentList = computed(() => 
      myStore.dispatch('getComments', { idPost: props.theIdPost }),
      myStore.state.commentList);
    // console.log('comment list : >>' , commentList.value);



    const postAuthor: string = props.theAuthor?.firstname + ' ' + props.theAuthor?.lastname;

    const [modalActive_DeletePost, toggleModal_DeletePost] = useModal()
    const [modalActive_ChangePost, toggleModal_ChangePost] = useModal()


    // Nom dynamique des id pour le modifier / supprimer les posts
    const buttonChangeDelete = 'openMenu_' + props.theIdPost;
    const menuDevelopChange = 'menuPostDev_' + props.theIdPost;
    const buttonChange = 'buttonChange_' + props.theIdPost;
    const buttonDelete = 'buttonDelete_' + props.theIdPost;

    // Nom dynamique des id pour les commentaires
    const divCommentSend = 'CommentSend_' + props.theIdPost;
    const divTextareaZone = 'textareaComment_' + props.theIdPost;
    const textareaSendPost = 'sendTxtComment_' + props.theIdPost;
    const buttonSendComment = 'sendComment_' + props.theIdPost;

    // Fonction d'affichage du menu Modifier/ supprimer le post
    function toggleMenuPost() {
      const boxMenuPost = document.querySelector('#' + menuDevelopChange) as HTMLDivElement;
      boxMenuPost.classList.toggle("hidebox");
    }

    return {
      commentList,
      postAuthor,
      toggleMenuPost,
      modalActive_ChangePost,
      toggleModal_ChangePost,
      modalActive_DeletePost,
      toggleModal_DeletePost,
      buttonChangeDelete,
      menuDevelopChange,
      buttonChange,
      buttonDelete,
      divCommentSend,
      divTextareaZone,
      buttonSendComment,
      textareaSendPost
    };
  },

  methods: {
    sendMyComment() {
      axios.post("http://localhost:3001/api/feed/" + this.theIdPost + "/comment", this.theNewComment)
        .then((res) => {
          // sendCommentButton.innerHTML = '<p>...</p>';
          // // sendCommentButton.setAttribute("disabled", "");
          // setTimeout(() => {
          //   commentContent.value = '';
          //   sendCommentButton.innerHTML = '<p>Envoyé</p>';
          // }, 3000);

          // console.log('Post en ligne ;)' , res)
        })
        .catch(error => {
          // sendCommentButton.setAttribute("disabled", "");
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    }
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

#fullBloc {
  height: 400px;
  background-color: $color-white;
  margin: 0 auto 0 50px;
  border-left: 1px solid $groupo-color1;

  #postBloc {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    #timeLikeMenuZone {
      margin-left: -50px;
      margin-bottom: 2px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      p {
        text-align: left;
        font-size: 0.9em;
        font-style: italic;
        font-weight: bold;
        color: $groupo-color4;
        margin: 0;

        img {
          width: 50px;
        }
      }

      .openMenuPost {
        margin: 0 auto 0 150px;
        border: 0 solid $groupo-color1;
        border-radius: 5px;
        background-color: transparent;

        &:hover {
          text-shadow: 2px 2px 5px rgba($groupo-color2, 1);
        }
      }

      .menuPostDevelop {
        // #menuPostDevelop{
        position: absolute;
        width: 200px;
        height: 90px;
        border-radius: 10px;
        box-shadow: 2px 2px 15px rgba($groupo-color4, 0.3);
        background-color: #fff;
        z-index: 100;

        button {
          display: block;
          border: 0;
          background-color: #fff;
          width: 100%;
          height: 50%;

          .menuPost_Change {
            // #menuPost_Change {
            border-radius: 10px 10px 0 0;
          }
          .menuPost_Delete {
            // #menuPost_Delete {
            border-radius: 0 0 10px 10px;
          }

          &:hover {
            background-color: rgba($groupo-color1, 0.1);
          }
          p {
            font-size: 1.1em;
            padding: 5px;
          }
        }
      }

      #likePost,
      #likePost p {
        color: $likeColor;
        font-weight: bold;
        font-size: 1em;
        text-align: right;

        button {
          border: 0;
          background-color: transparent;
          text-shadow: 2px 2px 5px $likeColor;
          color: $likeColor;
        }
      }
    }

    #PostZone {
      line-height: 100%;
      margin: 0;

      #thePostText {
        width: 95%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        background-color: rgba($groupo-colorLight2, 0.4);
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba($groupo-color3, 0.2);

        p {
          padding-top: 15px;
          padding-bottom: 15px;
          color: $groupo-color2;
          font-size: 1.1em;
          font-style: italic;
        }
      }
    }

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

        #buttonSendZone {
          width: 75px;
          height: 50px;
          border-radius: 0 10px 10px 0;
          background-color: $groupo-colorLight3;
          line-height: 100%;

          button {
            border: 0;
            background-color: transparent;
            margin: auto;
            color: $groupo-color1;

            #paperPlaneIcon {
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
  }

  #postFooter {
    width: 60%;
    border-bottom: 1px solid $groupo-color1;
    margin: 0 auto 0 auto;
  }
}

.hidebox {
  display: none;
}
</style>