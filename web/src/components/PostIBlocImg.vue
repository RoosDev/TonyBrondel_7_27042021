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
            alt="Profil Picture"
          />
          <img
            id="pictureAuthorReal"
            class="timePostImg"
            v-else
            :src="'../../' + props.theAuthor.photo_URL"
            alt="Profil Picture"
          />
          <p
            class="timePostText"
          >{{ props.theAuthor.firstname + ' ' + props.theAuthor.lastname }} - le {{ formatDatePost(props.theDate) }}</p>
        </span>
        <span id="menuPost" v-if="currentUser.id == props.theAuthor.id || myRole == 'okAGo'">
          <button :id="buttonDeleteImage" class="openMenuImage" @click="toggleMenuImage()">•••</button>
          <div :id="menuDevelopChangeImage" class="menuPostDevelopImg hidebox">
            <button
              :id="buttonDelete"
              class="menuPost_DeleteImg"
              @click="toggleModal_DeleteImg(); toggleMenuImage()"
            >
              <p>Supprimer</p>
            </button>
          </div>
        </span>
      </div>
      <div id="PostZoneImg" class="col-12 col-lg-6">
        <section id="thePostImg" class="col-12">
          <img id="theImageOfThePost" :src="'http://localhost:8080/' + props.theImgPost" alt />
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
  <Modal @close="toggleModal_DeleteImg" :modalActive="modalActive_DeleteImg">
    <div class="modal-content">
      <DeleteImage :postId="theIdPost" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';
import moment from 'moment';
import CommentZone from '@/components/CommentZone.vue';
import DeleteImage from '@/components/DeleteImage.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';

const props = defineProps<{
  theIdPost: number,
  theImgPost: string,
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

// Récupération de l' ID de l'utilisateur
const currentUserId = computed(() => myStore.getters.theUserId);
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myRole = currentUser.canOrNot!;


const checkOwner = () => {
  if (currentUserId.value == props.theAuthor.id) {
    return true;
  } else {
    return false;
  }
}

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
  #postBloc {
    #timeLikeMenuZone {

      #menuPost{
        .openMenuImage{
          margin: 0 10px 0 auto;
        }
      }

      .menuPost_DeleteImg {
        display: block;
        border: 0;
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 10px;

        &:hover {
          background-color: rgba($groupo-color1, 0.1);
        }
        p {
          font-size: 1.1em;
          padding: 5px;
        }
      }

      .menuPostDevelopImg {
        position: absolute;
        width: 200px;
        right: 50px;
        border-radius: 10px;
        box-shadow: 2px 2px 15px rgba($groupo-color4, 0.3);
        background-color: #fff;
        z-index: 100;
      }
    }

    #PostZoneImg {
      #thePostImg {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 95%;
        height: 250px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        background-color: rgba($groupo-colorLight2, 0.4);
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba($groupo-color3, 0.2);

        #theImageOfThePost {
          max-width: 98%;
          max-height: 98%;
          border-radius: 15px;
        }
      }
    }
  }
}
@media (max-width: 991.99px) {
  #fullBloc {
    #postBloc {
      #PostZoneImg {
        height: 250px;

        #thePostImg {
          max-height: 200px;
        }
      }
      #commentZone {
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

@media (max-width: 575.99px) {
  #fullBloc {
    #postBloc {
      #timeLikeMenuZone {
         #menuPost {
          .menuPostDevelopImg {
            width: 100px;
          }
        }
      }
    }
  }
}
@media (max-width: 329.99px) {
  #fullBloc {
    #postBloc {
      #timeLikeMenuZone {
        #menuPost {
          .menuPostDevelopImg {
            right: 15px;
          }
        }
      }
    }
  }
}
</style>