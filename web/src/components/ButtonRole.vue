<template>
    <button :id="'buttonRole' + props.idToChange" @click="toggleModal_Role">
        <font-awesome-icon class="buttonIcon" :icon="['fas', 'universal-access']" id="fontawesome-icon" />
    </button>

    <div id="buttonRole">
        <Modal @close="toggleModal_Role" :modalActive="modalActive_Role">
            <div class="modal-content">
                <ChangeRole :idToChange="props.idToChange" :name="props.name" :email="props.email" :role="props.role"/>
            </div>
        </Modal>
    </div>
</template>
<script setup lang="ts">
import ChangeRole from '@/components/ChangeRole.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '../composition/modal';

const props = defineProps<{
  email: string,
  idToChange: number,
  role: number, 
  name: string
}>()
const [modalActive_Role, toggleModal_Role] = useModal();

</script>