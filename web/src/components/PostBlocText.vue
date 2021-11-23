<template>
  <div id="fullBloc" class="col-md-10">
    <div id="postBloc">
      <div id="timeLikeMenuZone" class="col-12">
        <span id="timePost">
          <p>
            <img id="pictureAuthor" src="../assets/user-male.png" alt="Profil Picture" />
            {{ postAuthor }} - le {{ formatDatePost(theDate) }}
          </p>
        </span>
        <span id="likePost">
          <!-- <p>
            <button>
              <font-awesome-icon :icon="['fas', 'hand-peace']" />
            </button>
            {{ theLike }}
          </p> -->
        </span>
        <span id="menuPost">
          <button :id="buttonChangeDelete" class="openMenuPost" @click="toggleMenuPost()">•••</button>
          <div :id="menuDevelopChange" class="menuPostDevelop hidebox">
            <button
              :id="buttonChange"
              class="menuPost_Change"
              @click="toggleModal_ChangePost; toggleMenuPost()"
            >
              <p>Modifier</p>
            </button>
            <button
              :id="buttonDelete"
              class="menuPost_Delete"
              @click="toggleModal_DeletePost; toggleMenuPost()"
            >
              <p>Supprimer</p>
            </button>
          </div>
        </span>
      </div>
      <div id="PostZone" class="col-md-6">
        <div id="thePostText" class="col-12">
          <p>{{ theTxtPost }}</p>
        </div>
      </div>
      <div id="commentZone" class="col-md-6">
        <CommentZone
          :theIdPost="props.theIdPost"
          :theComments="props.theComments"
          :key="props.theComments.id"
        />
      </div>
    </div>
    <div id="postFooter" class="col-6">
      <p></p>
    </div>
  </div>
  <Modal @close="toggleModal_ChangePost" :modalActive="modalActive_ChangePost">
    <div class="modal-content">
      <ChangeText :postId="theIdPost" :content="theTxtPost" />
    </div>
  </Modal>
  <Modal @close="toggleModal_DeletePost" :modalActive="modalActive_DeletePost">
    <div class="modal-content">
      <DeletePost :postId="theIdPost" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import CommentZone from '@/components/CommentZone.vue';
import ChangeText from '@/components/ChangeText.vue';
import DeletePost from '@/components/DeletePost.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';
import moment from 'moment';

const props = defineProps<{
  theIdPost: number,
  theTxtPost: string,
  theAuthor: { string },
  theDate: string,
  theComments: { string }}>()

const postDate = props.theDate!;

// Fonction de mise en forme de la date du post
const formatDatePost = (postDate) => {
  moment.locale("fr")
  return moment(postDate).format('lll')
}

const authorFirstname = props.theAuthor.firstname!;
const authorLastname = props.theAuthor.lastname!;

const postAuthor: string = authorFirstname + ' ' + authorLastname;
const theComments = reactive(props.theComments!);
const [modalActive_DeletePost, toggleModal_DeletePost] = useModal()
const [modalActive_ChangePost, toggleModal_ChangePost] = useModal()


// Nom dynamique des id pour le modifier / supprimer les posts
const buttonChangeDelete = 'openMenu_' + props.theIdPost;
const menuDevelopChange = 'menuPostDev_' + props.theIdPost;
const buttonChange = 'buttonChange_' + props.theIdPost;
const buttonDelete = 'buttonDelete_' + props.theIdPost;

// Fonction d'affichage du menu Modifier/ supprimer le post
const toggleMenuPost = () => {
  const boxMenuPost = document.querySelector('#' + menuDevelopChange) as HTMLDivElement;
  boxMenuPost.classList.toggle("hidebox");
}

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