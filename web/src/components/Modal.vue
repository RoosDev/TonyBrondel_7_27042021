<template>
  <transition name="modal_animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <font-awesome-icon @click="close" id="closeModalAwesome" :icon="['fas', 'times-circle']" />
          <!-- MODAL CONTENT -->
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">

export default {
  props: ["modalActive", "modalActive_Txt", "modalActive_Img", "modalActive_DeletePost"],
  setup(props:any, { emit }:any ) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
};
</script>


<style lang="scss" scoped>
@import "../scss/variables.scss";

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($groupo-color4, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    min-height: 500px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;
    border-radius: 10px;

    #closeModalAwesome {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
      color: $groupo-color4;

      &:hover {
        color: $groupo-color1;
      }
    }
  }
}
</style>