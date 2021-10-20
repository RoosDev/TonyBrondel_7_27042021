<template lang="fr">
    <div id="fullBloc" class="col-md-10">
        <div id="postBloc">
            <div id="timeLikeMenuZone" class="col-12">
                <span id="timePost" >
                <p> <img id="pictureAuthor" src="../assets/user-male.png" alt="Profil Picture"> Jean Pranhune - le 4 octobre 2021 à 12h54 </p>
                </span>
                <span id="likePost" >
                    <p><button><font-awesome-icon :icon="['fas', 'hand-peace']" /></button> {{ theLike }} </p>
                </span>
                <span id="menuPost" >
                    <button>•••</button>
                </span>
            </div>
            <div id="PostZone" class="col-md-6">
                <div id="thePostText" class="col-12">
                    <p>
                        {{ thePost }} 
                    </p>
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

      button {
        margin: 0 auto 0 150px;
        border: 0 solid $groupo-color1;
        border-radius: 5px;
        background-color: transparent;

        &:hover {
          text-shadow: 5px 5px 2px rgba($groupo-color1, 0.3);
          margin: 7px auto 8px 147px;
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

        #commentBubble {
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
      }

      #CommentSend {
        height: 60px;
        margin: 0 auto 5px auto;
        border-top: 1px solid $groupo-color3;
        align-self: baseline;
        padding-top: 10px;

        #textareaZone {
          height: 50px;
          border-radius: 10px 0 0 10px;
          background-color: $groupo-colorLight3;

          textarea {
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
              margin-top: 20px;
              margin-left: -25px;
              font-size: 2.7em;
              z-index: 5;
              transition: all 400ms;
            }
          }

          &:hover {
            #paperPlaneIcon {
              margin-top: -20px;
              margin-left: +25px;
              font-size: 0.2em;
            }
          }
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

</style>