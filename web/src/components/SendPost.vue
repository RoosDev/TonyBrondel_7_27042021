<template lang="fr">
        <div id="sendPost__Global" class="row">
                <div id="sendPostPicture" >
                        <img id="pictureSendMsg" src="../assets/ampoule-clean-small.png" alt="Une idée, exprimez vous ici.">
                </div>
                <div id="sendPostAction" >
                        <div id="sendBox__Title" class="col-12" >
                          <p>C'est le moment ... Quelle partie de vous veut s'exprimer ?</p>
                        </div>
                        <div id="sendBox__Type">
                                <div id="sendBox__T--text" class="col-6 sendBox__T">
                                  <button type="button" @click="toggleModal_Txt" class="col-10" >
                                        <font-awesome-icon :icon="['fas', 'edit']" id='fontawesome-icon' /><p>mon côté littéraire</p>
                                  </button>
                                </div>
                                <div  id="sendBox__T--img" class="col-6 sendBox__T">
                                  <button type="button" @click="toggleModal_Img" class="col-10">
                                        <font-awesome-icon :icon="['fas', 'image']" id='fontawesome-icon' /><p>mon côté artiste</p>
                                  </button>
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
<script setup lang="ts">
import PostText from '@/components/PostText.vue';
import PostImage from '@/components/UploadPostImage.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';

const [modalActive_Txt, toggleModal_Txt] = useModal();
const [modalActive_Img, toggleModal_Img] = useModal();

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
  width: 75%;
  min-height: 100px;
  max-height: 125px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 10px auto 20px auto;
  border: 0;
  background-color: $color-white;
  border-radius: 50px;

  #sendPostPicture {
    width: 15%;
    #pictureSendMsg {
      max-width: 50%;
      max-height: 50%;
      margin: auto auto auto 25px;
    }
  }
  #sendPostAction {
    width: 85%;
    text-align: right;
    margin-top: 25px auto 20px auto;

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
      justify-content: space-evenly;
      align-items: center;

      button {
        height: 35px;
        margin: 10px 20px 10px 20px;
        border: 1px solid $groupo-color1;
        border-radius: 10px;
        background-color: $groupo-colorLight1;
        color: $groupo-color5;
        font-weight: bold;

        &:hover {
          background-color: $groupo-color4;
          color: $groupo-colorLight1;
          margin: 13px 17px 7px 23px;
          box-shadow: 5px 5px 15px $groupo-color3;
        }

        #fontawesome-icon {
          margin-right: 20px;
        }

        p {
          display: inline;
        }
      }
    }
  }
}

@media (max-width: 991.99px) {
  #sendPost__Global {
    font-size: 0.8em;
  }
}
@media (max-width: 767.99px) {
  #sendPost__Global {
    justify-content: center;

    #sendPostPicture {
      display: none;
    }
    #sendPostAction {
      width: 95%;
      margin: auto;
      text-align: center;
      #sendBox__Title{
        margin-bottom: 0;
        p{
          margin: 0;
        }
      }
      #sendBox__Type {
        margin-top: 0;
        button {
          height: 35px;
          margin: 3px;

          &:hover {
            margin: 6px 0px 0px 6px;
          }
          #fontawesome-icon {
            display: none;
          }
        }
      }
    }
  }
}

@media (max-width: 575.99px) {
  #sendPost__Global {
    font-size: 0.7em;

    #sendBox__Type {
      button {
        height: 40px;

        #fontawesome-icon {
          display: inline;
        }
        p {
          display: none;
        }
      }
    }
  }
}
</style>