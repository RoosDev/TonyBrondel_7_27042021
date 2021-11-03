<template>
    <div id="PostText" class="col-12">
        <form id="postTextForm">
            <div id="PostwriteContent">
                <label for="PostContent">
                    <h2>Lâchez nous vos pensées...</h2>
                </label>
                <textarea
                    name="PostContent"
                    id="PostContent"
                    cols="65"
                    rows="6"
                    autocapitalize="sentence"
                    form="postTextForm"
                    maxlength="650"
                    placeholder="Saisissez ici votre prose..."
                    required
                    autofocus
                ></textarea>
                <button class="col-9" type="button">Poster</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts">

</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    margin: 35px auto 0 auto;
    text-align: center;
  }

  textarea {
    display: block;
    resize: none;
    margin: 50px auto 0 auto;
    border: 1px solid rgba($groupo-color4, 0.5);
    background-color: rgba($groupo-color4, 0.2);
    border-radius: 10px;

    &:hover {
      background-color: transparent;
    }
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