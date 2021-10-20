<template>
    <div id="PostImg" class="col-12">
        <form id="PostImgForm">
            <div id="PostImgContent">
                <h2>Affichez cette image sur la place publique </h2>
                <label id="labelSendPicture" for="inputSendPicture">Sélectionner un fichier</label>
                <input type='file' id="inputSendPicture" accep="image/*.jpg, image/*.jpeg, image/*.png, image/*.gif">
                <div id="quickDisplayImg">Aucune image sélectionnée</div>
                <button class="col-9" type="button">Poster</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostImg {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #labelSendPicture {
    display: block;
    margin-top: 50px;
    padding: 14px 45px;
    background: $ValidColor1;
    color: $color-white;
    font-size: 1em;
    transition: all 0.4s;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;

    &:hover {
      font-weight: bold;
      color: $groupo-color4;
      border: 1px solid $groupo-color1;
    }
  }

  #inputSendPicture {
    display: block;
    width: 225px;
    top: 0;
    left: 0;
    margin: 50px auto 0 auto;
    border: 1px solid rgba($groupo-color1, 0.5);
    background-color: rgba($groupo-color4, 0.2);
    border-radius: 10px;
    position: absolute;
    opacity: 0;
    padding: 14px 0;
    cursor: pointer;

    &:hover {
      background-color: transparent;
    }
  }

  #quickDisplayImg {
    display: block;
    margin: 25px auto 25px auto;
    text-align: center;
    font-size: 1.2em;
    color: $groupo-color4;
  }

  button {
    display: block;
    height: 40px;
    margin: 70px auto 50px auto;
    border: 1px solid $groupo-color1;
    border-radius: 10px;
    background-color: rgba($groupo-color4, 0.2);
    color: $groupo-color1;

    &:hover {
      border: 2px solid #006500;
      border-radius: 15px;
      background-color: rgba($likeColor, 0.5);
      color: #006500;
      font-weight: bold;
    }
  }

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>