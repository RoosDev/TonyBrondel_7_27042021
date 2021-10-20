<template lang="fr">
    <div id="fullBloc" class="col-md-10">
        <div id="postBloc">
            <div id="timeLikeMenuZone" class="col-12">
                <span id="timePost" >
                <p> <img id="pictureAuthor" src="../assets/user-male.png" alt="Profil Picture"> Jean Pranhune - le 4 octobre 2021 à 12h54 </p>
                </span>
                <span id="likePost" >
                    <p><button><font-awesome-icon :icon="['fas', 'hand-peace']" /></button> {{ theLike }}</p>
                </span>
                <span id="menuPost" >
                    <button>•••</button>
                </span>
            </div>
            <div id="PostZone" class="col-md-6">
                <div id="thePost" class="col-12">
                    <!-- <img src="../../public/Public_Images/life_in_elevator.gif" alt="ma video"> -->
                    <img :src="'../../public/Public_Images/'+ thePost" alt="ma video">

                </div>
            </div>
            <div id="commentZone" class="col-md-6">
                <div id="CommentList">
                    <!-- Ici sont intégrés les commentaires -->
                    <div id="commentBubble">
                      <div id="bubbleText" class="col">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloremque expedita delectus accusantium numquam tempora deserunt, qui optio natus enim, a ducimus, temporibus fugiat suscipit eveniet quis modi doloribus praesentium? </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> Jeanne Dharque -  05/10/2021 à 18h12  </p>
                      </div>
                    </div>  
                    <div id="commentBubble">
                      <div id="bubbleText" class="col">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloremque expedita delectus accusantium numquam tempora deserunt, qui optio natus enim, a ducimus, temporibus fugiat suscipit eveniet quis modi doloribus praesentium? </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> Paul Pote -  06/10/2021 à 06h58  </p>
                      </div>
                    </div>  
                    <div id="commentBubble">
                      <div id="bubbleText" class="col">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloremque expedita delectus accusantium numquam tempora deserunt, qui optio natus enim, a ducimus, temporibus fugiat suscipit eveniet quis modi doloribus praesentium? </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> Guy Gratte-Poil -  05/10/2021 à 18h12  </p>
                      </div>
                    </div>  
                    <div id="commentBubble">
                      <div id="bubbleText" class="col">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloremque expedita delectus accusantium numquam tempora deserunt, qui optio natus enim, a ducimus, temporibus fugiat suscipit eveniet quis modi doloribus praesentium? </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> Marcel ésonnorquestre -  05/10/2021 à 18h12  </p>
                      </div>
                    </div>  
                    <div id="commentBubble">
                      <div id="bubbleText" class="col">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloremque expedita delectus accusantium numquam tempora deserunt, qui optio natus enim, a ducimus, temporibus fugiat suscipit eveniet quis modi doloribus praesentium? </p>
                      </div>
                      <div id="bubbleAuthor" class="col">
                        <p> Jeanne Dharque -  05/10/2021 à 18h12  </p>
                      </div>
                    </div>  
                </div>
                <div id="CommentSend">
                    <form class="row align-items-center">
                        <div id="textareaZone" class="col-10" >
                            <textarea name="sendPost" id="sendPost" cols="60" rows="2" placeholder="Saisissez votre commentaire ici" autocapitalize="sentences" ></textarea>
                        </div>
                        <div id="buttonSendZone" class="col-2">
                            <button type="submit" > <font-awesome-icon id="paperPlaneIcon" :icon="['fas', 'paper-plane']" /> </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="postFooter" class="col-6"><p></p></div>
    </div>
</template>
<script setup lang="ts">
  defineProps({
    thePost: String, 
    theLike: Number,
    comments: [String],
  })
</script>
<style lang="scss">
@import "../scss/variables.scss";

#fullBloc {
  #postBloc {
    #PostZone {
      #thePost {
        margin-left: auto;
        margin-right: auto;
        text-align: center;

        img {
          width: 90%;
          min-width: 300px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0;
          border-radius: 20px;
          box-shadow: 0 5px 20px rgba($groupo-color4, 0.2);
          transition: width 560ms;

          &:hover {
            width: 95%;
          }
        }
      }
    }
  }
}

</style>