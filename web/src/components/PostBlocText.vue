<template>
  <article id="fullBloc" class="col-11 col-lg-10">
    <div id="postBloc">
      <div id="timeLikeMenuZone" class="col-12">
        <span id="timePost">
          <img
            id="pictureAuthor"
            class="timePostImg"
            v-if="!props.theAuthor.photo_URL"
            src="../assets/person.png"
            alt="'Photo de profil "
          />
          <img
            id="pictureAuthorReal"
            class="timePostImg"
            v-else
            :src="'../../' + props.theAuthor.photo_URL"
            :alt="'Photo de ' + props.theAuthor.firstname + ' ' + props.theAuthor.lastname"
          />
          <p
            class="timePostText"
          >{{ props.theAuthor.firstname + ' ' + props.theAuthor.lastname }} - le {{ formatDatePost(props.theDate) }}</p>
        </span>
        <span id="menuPost" v-if="currentUser.id == props.theAuthor.id || myRole == 'okAGo'">
          <button
            name="Ouverture du sous menu du post"
            :id="buttonChangeDeletePostText"
            class="openMenuPostText"
            @click="toggleMenuPost()"
          >•••</button>
          <div :id="menuDevelopChangePostText" class="menuPostDevelopTxt hidebox">
            <button
              name="Modifier le post"
              :id="buttonChangePostText"
              class="menuPost_Change"
              v-if="currentUser.id == props.theAuthor.id"
              @click="toggleModal_ChangePost(), toggleMenuPost()"
            >
              <p>Modifier</p>
            </button>
            <button
              name="Supprimer le post"
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
        <section id="thePostText" class="col-12">
          <p>{{ theTxtPost }}</p>
        </section>
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
  </article>
  <Modal @close="toggleModal_ChangePost" :modalActive="modalActive_ChangePost">
    <div class="modal-content">
      <ChangeText :postId="theIdPost" :theContent="theTxtPost" />
    </div>
  </Modal>
  <Modal @close="toggleModal_DeletePost" :modalActive="modalActive_DeletePost">
    <div class="modal-content">
      <DeletePost :postId="theIdPost" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';
import moment from 'moment';
import CommentZone from '@/components/CommentZone.vue';
import ChangeText from '@/components/ChangeText.vue';
import DeletePost from '@/components/DeletePost.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';

const props = defineProps<{
  theIdPost: number,
  theTxtPost: string,
  theAuthor: any,
  theDate: string,
  theComments: any
}>()

const myStore: any = store;

// Fonction de mise en forme de la date du post
const formatDatePost = (postDate) => {
  moment.locale("fr")
  return moment(postDate).format('lll')
}

// Récupération du role de l'utilisateur
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myRole = currentUser.canOrNot!;



const checkOwner = () => {
  if (currentUser.id == props.theAuthor.id) {
    return true;
  } else {
    return false;
  }
}

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

article[id="fullBloc"] {
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

      #timePost {
        width: 85%;
        .timePostImg {
          width: 50px;
        }
        #pictureAuthorReal {
          border-radius: 50%;
        }
        .timePostText {
          display: inline;
          text-align: left;
          font-size: 0.9em;
          font-style: italic;
          font-weight: bold;
          color: $groupo-color4;
          margin: 0;
        }
      }
      #menuPost {
        text-align: right;

        width: 15%;
        .openMenuPostText {
          margin: 0 10px 0 auto;
          border: 0px;
          border-radius: 15px;
          background-color: transparent;

          &:hover {
            text-shadow: 2px 2px 5px rgba($groupo-color2, 1);
          }
        }

        .menuPostDevelopTxt {
          position: absolute;
          width: 200px;
          right: 50px;
          border-radius: 10px;
          box-shadow: 2px 2px 15px rgba($groupo-color4, 0.3);
          background-color: $color-white;
          z-index: 100;
        }

        .menuPost_Delete,
        .menuPost_Change {
          display: block;
          border: 0;
          width: 100%;
          height: 50%;

          &:hover {
            background-color: rgba($groupo-color1, 0.1);
          }
          p {
            font-size: 1.1em;
            margin : 5px auto 5px auto;
          }
        }
        .menuPost_Change {
          border-radius: 10px 10px 0 0;
          border-bottom: 1px dotted $groupo-color1;
        }
        .menuPost_Delete {
          border-radius: 0 0 10px 10px;
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
        height: 250px;
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
    height: auto;
    margin-left: auto;
    margin-right: auto;

    #postBloc {
      flex-flow: column nowrap;

      #timeLikeMenuZone {
        margin-left: -50px;
      }

      #PostZone {
        display: flex;
        height: 175px;
        line-height: 100%;
        margin: 0;

        #thePostText {
          max-height: 125px;
        }
      }
      #commentZone {
        display: flex;
        height: 300px;
      }
    }
  }
}
@media (max-width: 575.99px) {
  #fullBloc {
    margin: 0 auto 0 auto;
    font-size: 0.8em;
    #postBloc {
      #timeLikeMenuZone {
        margin-left: 0px;
        #menuPost {
          .menuPostDevelopTxt {
            width: 100px;
          }
        }
      }
      #PostZone {
        height: 250px;

        #thePostText {
          max-height: 200px;
        }
      }
      #commentZone {
        display: flex;
        height: 300px;
      }
    }
  }
}
@media (max-width: 329.99px) {
  #fullBloc {
    margin: 0 auto 0 10px;

    #postBloc {
      #timeLikeMenuZone {
        #menuPost {
          .menuPostDevelopTxt {
            right: 15px;
          }
        }
      }

      #PostZone {
        height: 275px;

        #thePostText {
          max-height: 225px;
        }
      }
      #commentZone {
        display: flex;
        height: 300px;
      }
    }
  }
}
</style>