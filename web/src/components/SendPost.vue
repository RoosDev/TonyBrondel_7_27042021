<template lang="fr">
  <div id="sendPost__Global" class="row">
    <img id="pictureProfilMin" src="../assets/user-male.png" alt="Profil Picture">
    <div id="sendPostAction" class="col-12 col-md-8">
      <div id="sendBox__Title">
        <p>C'est le moment ... Quelle partie de vous veut s'exprimer ?</p>
      </div>
      <div id="sendBox__Type">
        <div id="sendBox__T--text" class="col-12 col-md-4">
          <button type="button" @click="toggleModal_Txt"><font-awesome-icon :icon="['fas', 'edit']" id='fontawesome-icon'/>mon côté litteraire</button>
        </div>
        <div  id="sendBox__T--img" class="col-12 col-md-4">
          <button type="button" @click="toggleModal_Img"><font-awesome-icon :icon="['fas', 'image']" id='fontawesome-icon' />mon côté artiste</button>
        </div>
      </div>
    </div>
  </div>
    <Modal @close="toggleModal_Txt" :modalActive="modalActive_Txt">
      <div class="modal-content"> 
        <PostText />
      </div>
    </Modal>
    <Modal @close="toggleModal_Img" :modalActive="modalActive_Img">
      <div class="modal-content">
        <PostImage/>
      </div>
    </Modal>
</template>
<script lang="ts">
import Modal from '@/components/Modal.vue';
import PostText from '@/components/PostText.vue';
import PostImage from '@/components/PostImage.vue';
import { useModal } from '@/composition/modal';

export default {
  name: 'SendPost',
  components: {
    Modal,
    PostText,
    PostImage
  },
  setup() {
    const [modalActive_Txt, toggleModal_Txt] = useModal();
    const [modalActive_Img, toggleModal_Img] = useModal();
    return { modalActive_Txt, toggleModal_Txt, modalActive_Img, toggleModal_Img };
  },
};
</script>
<style lang="scss">
@import "../scss/variables.scss";

// CSS des modales

.modal-content {
  display: flex;
  flex-direction: column;
  border: 0;

  h1,
  p {
    margin-bottom: 16px;
  }

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 18px;
  }
}

//  CSS de la page classique
#sendPost__Global {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px auto 20px auto;
  z-index: 0;

  #pictureProfilMin {
    width: 125px;
    margin: 5px -125px 5px 70px;
    z-index: 5;
  }

  #sendPostAction {
    text-align: right;
    margin-top: 25px auto 20px -30px;
    border: 0;
    background-color: $color-white;
    border-radius: 50px;
    z-index: 0;

    #sendBox__Title {
      p {
        font-size: 1.1em;
        color: $groupo-color2;
        text-align: center;
        margin-top: 10px;
        font-weight: bold;
      }
    }

    #sendBox__Type {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      button {
        width: 200px;
        height: 35px;
        margin: 10px 20px 10px 20px;
        border: 1px solid $groupo-color1;
        border-radius: 10px;
        background-color: $groupo-colorLight1;
        color: $groupo-color1;

        &:hover {
          background-color: $groupo-color4;
          color: $groupo-colorLight1;
          margin: 7px 23px 7px -3px;
          box-shadow: 5px 5px 15px $groupo-color3;
        }

        #fontawesome-icon {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>