<template>
    <button id="adminDeleteProfile" @click="toggleModal_adminDeleteProfile">
        <font-awesome-icon :icon="['fas', 'trash-alt']" id="fontawesome-icon"  class="buttonIcon"/>
    </button>

    <div id="buttonRole">
        <Modal @close="toggleModal_adminDeleteProfile" :modalActive="modalActive_adminDeleteProfile">
            <div class="modal-content">
                <DeleteProfileAdmin
                    :TheIdGetOut="props.idToDelete"
                    :name="props.name"
                    :email="props.email"
                    :role="props.role"
                />
            </div>
        </Modal>
    </div>
</template>
<script setup lang="ts">
import DeleteProfileAdmin from '@/components/DeleteProfileAdmin.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '../composition/modal';

const props = defineProps<{
    email: string,
    idToDelete: number,
    role: number,
    name: string
}>()
const [modalActive_adminDeleteProfile, toggleModal_adminDeleteProfile] = useModal();

</script>
<style lang="scss">
</style>