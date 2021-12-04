<template>
  <div id="fullBloc" class="col-11 col-lg-10">
    <div id="postBloc">
      <div id="timeLikeMenuZone" class="col-12">
        <span id="timePost">
          <p>
            <img id="pictureAuthor" src="../assets/user-male.png" alt="Profil Picture" />
            {{ postAuthor }} - le {{ formatDatePost(theDate) }}
          </p>
        </span>
        <span id="likePost">
        </span>
        <span id="menuPost" v-if="myId === props.theAuthor.id">
          <button :id="buttonDeleteImage" class="openMenuImage" @click="toggleMenuImage()">•••</button>
          <div :id="menuDevelopChangeImage" class="menuPostDevelop hidebox">
            <button
              :id="buttonDelete"
              class="menuPost_Delete"
              @click="toggleModal_DeleteImg(); toggleMenuImage()"
            >
              <p>Supprimer</p>
            </button>
          </div>
        </span>
      </div>
      <div id="PostZone" class="col-12 col-lg-6">
        <div id="thePostImg" class="col-12">
          <img id="theImageOfThePost" :src="'http://localhost:8080/'+ theImgPost" alt="" />
        </div>
      </div>
      <div id="commentZone" class="col-12 col-lg-6">
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
  <Modal @close="toggleModal_DeleteImg" :modalActive="modalActive_DeleteImg">
    <div class="modal-content">
      <DeleteImage :postId="theIdPost" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import CommentZone from '@/components/CommentZone.vue';
import DeleteImage from '@/components/DeleteImage.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';
import moment from 'moment';

const props = defineProps<{
  theIdPost: number,
  theImgPost: string,
  theAuthor: any,
  theDate: string,
  theComments: any 
}>()

const postDate = props.theDate!;

// Fonction de mise en forme de la date du post
const formatDatePost = (postDate) => {
  moment.locale("fr")
  return moment(postDate).format('lll')
}

// Récupération de l' ID de l'utilisateur
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myId = currentUser.id!;

const checkOwner = () => {
  if (myId == props.theAuthor.id){
    return true;
  }else{
    return false;
  }
}

const authorFirstname = props.theAuthor.firstname!;
const authorLastname = props.theAuthor.lastname!;

const postAuthor: string = authorFirstname + ' ' + authorLastname;
const theComments = reactive(props.theComments!);
const [modalActive_DeleteImg, toggleModal_DeleteImg] = useModal()


// Nom dynamique des id pour le modifier / supprimer les posts
const buttonDeleteImage = 'openMenu_' + props.theIdPost;
const menuDevelopChangeImage = 'menuPostDev_' + props.theIdPost;
const buttonDelete = 'buttonDelete_' + props.theIdPost;

// Fonction d'affichage du menu Modifier/ supprimer le post
const toggleMenuImage = () => {
  const boxMenuPost = document.querySelector('#' + menuDevelopChangeImage) as HTMLDivElement;
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

      .openMenuImage {
        margin: 0 auto 0 150px;
        border: 0 solid $groupo-color1;
        border-radius: 5px;
        background-color: transparent;

        &:hover {
          text-shadow: 2px 2px 5px rgba($groupo-color2, 1);
        }
      }

   

      #menuDevelopChangeImage{
        height: 45px;
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

      #thePostImg {
        display:flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 95%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        background-color: rgba($groupo-colorLight2, 0.4);
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba($groupo-color3, 0.2);
        

        #theImageOfThePost{
          max-width: 100%;
          max-height: 100%;
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
@media (max-width: 991.99px) {
  #fullBloc {
    height: 750px;
    background-color: $color-white;
    margin: 20px auto 0 30px;
    border-left: 1px solid $groupo-color1;

    #postBloc {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;



      #PostZone {
        display: flex;
        height: 350px;
        line-height: 100%;
        margin: 0;

         #thePostText {
          max-height: 300px;
        }
      }
      #commentZone{
        display: flex;
        height: 400px;

      }
    }

    #postFooter {
      width: 60%;
      border-bottom: 1px solid $groupo-color1;
      margin: 0 auto 0 auto;
    }
  }
}
</style>