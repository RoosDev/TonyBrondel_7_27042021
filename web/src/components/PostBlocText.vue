<template>
  <div id="fullBloc" class="col-11 col-lg-10">
    <div id="postBloc">
      <div id="timeLikeMenuZone" class="col-12">
        <span id="timePost">
          <p>
            <img id="pictureAuthor" v-if="!props.theAuthor.photo_URL"  src="../assets/user-male.png" alt="Profil Picture" />
            <img id="pictureAuthorReal" v-else :src="'../../'+props.theAuthor.photo_URL" alt="Profil Picture" />
            {{ props.theAuthor.firstname + ' ' + props.theAuthor.lastname }} - le {{ formatDatePost(props.theDate) }}
          </p>
        </span>
        <span id="menuPost" v-if="myId == props.theAuthor.id || myRole == 'okAGo'">
          <button
            :id="buttonChangeDeletePostText"
            class="openMenuPostText"
            @click="toggleMenuPost()"
          >•••</button>
          <div :id="menuDevelopChangePostText" class="menuPostDevelop hidebox">
            <button
              :id="buttonChangePostText"
              class="menuPost_Change"
              @click="toggleModal_ChangePost(), toggleMenuPost()"
            >
              <p>Modifier</p>
            </button>
            <button
              :id="buttonDeletePostText"
              class="menuPost_Delete"
              @click="toggleModal_DeletePost(), toggleMenuPost()"
            >
              <p>Supprimer</p>
            </button>
          </div>
        </span>
      </div>
      <div id="PostZone" class="col-12 col-lg-6">
        <div id="thePostText" class="col-12">
          <p>{{ theTxtPost }}</p>
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
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';
import CommentZone from '@/components/CommentZone.vue';
import ChangeText from '@/components/ChangeText.vue';
import DeletePost from '@/components/DeletePost.vue';
import moment from 'moment';

const props = defineProps<{
  theIdPost: number,
  theTxtPost: string,
  theAuthor: any,
  theDate: string,
  theComments: any
}>()

// Fonction de mise en forme de la date du post
const formatDatePost = (postDate) => {
  moment.locale("fr")
  return moment(postDate).format('lll')
}

defineExpose({
  props
})

// Récupération de l' ID de l'utilisateur
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myId = currentUser.id!;
const myRole = currentUser.canOrNot!;


const checkOwner = () => {
  if (myId == props.theAuthor.id) {
    return true;
  } else {
    return false;
  }
}

console.log(props.theAuthor);
// const theComments = reactive(props.theComments!);
const [modalActive_DeletePost, toggleModal_DeletePost] = useModal()
const [modalActive_ChangePost, toggleModal_ChangePost] = useModal()


// Nom dynamique des id pour le modifier / supprimer les posts
const buttonChangeDeletePostText = 'openMenu_' + props.theIdPost;
const menuDevelopChangePostText = 'menuPostDev_' + props.theIdPost;
const buttonChangePostText = 'buttonChange_' + props.theIdPost;
const buttonDeletePostText = 'buttonDelete_' + props.theIdPost;

// Fonction d'affichage du menu Modifier/ supprimer le post
const toggleMenuPost = () => {
  const boxMenuPost = document.querySelector('#' + menuDevelopChangePostText) as HTMLDivElement;
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
        #pictureAuthorReal{
          border-radius: 50%;
        }
      }

      .openMenuPostText {
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

        .menuPost_Delete,
        .menuPost_Change {
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

        .buttonLike {
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
    height: 770px;
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